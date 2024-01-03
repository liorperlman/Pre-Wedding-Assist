import React, { Component } from 'react';
import { Button, ButtonGroup, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import djStageImage from './images/dj_stage.png'

class VenueLayout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tables: [],
            guests: [],
            stages: [],
            selectedObjectId: null,
            offsetX: 0,
            offsetY: 0,
            className: '',
            isLocked: false, // Variable for locking tables
        };
    }

    componentDidMount() {
        this.fetchTables();
        this.fetchGuests();
        this.fetchStages();
    }

    fetchTables() {
        fetch('/user/tables')
            .then((response) => response.json())
            .then((data) => {
                this.setState({ tables: data });
            })
            .catch((error) => {
                console.error('Error fetching tables:', error);
            });
    }

    fetchGuests() {
        fetch('/user/guests')
            .then((response) => response.json())
            .then((data) => {
                this.setState({ guests: data });
            })
            .catch((error) => {
                console.error('Error fetching guests:', error);
            });
    }

    fetchStages() {
        fetch('/user/stages')
            .then((response) => response.json())
            .then((data) => {
                this.setState({ stages: data });
            })
            .catch((error) => {
                console.error('Error fetching guests:', error);
            });
    }

    handleObjectMouseDown = (event, objectId) => {
        event.stopPropagation();
        if (this.state.isLocked) {
            return; // Return early if tables are locked
        }
        this.setState({
            selectedObjectId: objectId,
            offsetX: event.nativeEvent.offsetX,
            offsetY: event.nativeEvent.offsetY,
            className: event.target.className,
        });
        document.addEventListener('mousemove', this.handleObjectMouseMove);
        document.addEventListener('mouseup', this.handleObjectMouseUp);
    };

    handleObjectMouseMove = (event) => {
        if (this.state.isLocked) {
            return; // Return early if tables are locked
        }
        const { selectedObjectId, offsetX, offsetY, className } = this.state;
        const { clientX, clientY } = event;
        const venueLayout = document.getElementById('venue-layout');
        const venueLayoutRect = venueLayout.getBoundingClientRect();

        const newX = clientX - venueLayoutRect.left - offsetX;
        const newY = clientY - venueLayoutRect.top - offsetY;
        if (className == 'table') {
            this.setState((prevState) => ({
                tables: prevState.tables.map((table) =>
                    table.id === selectedObjectId ? { ...table, x: newX, y: newY } : table
                ),
            })); 
        }
        else{
            this.setState((prevState) => ({
                stages: prevState.stages.map((stage) =>
                    stage.id === selectedObjectId ? { ...stage, x: newX, y: newY } : stage
                ),
            }));
        }
    };

    handleObjectMouseUp = () => {
        if (this.state.isLocked) {
            return; // Return early if tables are locked
        }
        this.setState({
            selectedObjectId: null,
            offsetX: 0,
            offsetY: 0,
        });
        document.removeEventListener('mousemove', this.handleObjectMouseMove);
        document.removeEventListener('mouseup', this.handleObjectMouseUp);
    };

    assignGuestToTableDrag(guestId, tableId) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: guestId,
                table_number: tableId
            })
        };
        fetch('/user/assign-guest-to-table', requestOptions).then((response) =>
            response.json()
        ).then((data) => {
            // Update the guest list state with the updated data
            this.setState((prevState) => ({
              guests: prevState.guests.map((guest) =>
                guest.id === guestId ? { ...guest, table: tableId } : guest
              )
            }), () => {
                // Call fetchGuests after updating the guest list to fetch the latest data
                this.fetchGuests();
              });
          })
          .catch((error) => console.error('Error assigning guest to table:', error));
    }

    handleTableDrop = (event, tableId) => {
        event.preventDefault();
        const guestId = parseInt(event.dataTransfer.getData('text/plain'));
        const updatedGuests = this.state.guests.map((guest) => {
            if (guest.id === guestId) {
                this.assignGuestToTableDrag(guestId, tableId)
            }
            return guest;
        });
        this.setState({ guests: updatedGuests });
        this.updateTableGuests(tableId, guestId);
    };

    handleTableDragOver = (event) => {
        event.preventDefault();
    };

    handleGuestDragStart = (event, guest) => {
        event.dataTransfer.setData('text/plain', guest.id);
    };

    updateTableGuests = (tableId, guestId) => {
        const updatedTables = this.state.tables.map((table) => {
            if (table.id === tableId) {
                const updatedGuests = [...table.guests, guestId];
                return { ...table, guests: updatedGuests };
            }
            return table;
        });

        this.setState({ tables: updatedTables }, () => {
            // Call fetchGuests after updating tables to fetch the updated guest data
            this.fetchGuests();
        });
    };

    handleLockButtonClick = () => {
        this.setState((prevState) => ({
            isLocked: !prevState.isLocked, // Toggle the lock state
        }));
    };

    handleSubmitButtonClick = () => {
        this.state.tables.forEach(table =>
            {const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  id: table.id,
                  capacity: table.capacity,
                  wedding: table.wedding,
                  x: table.x,
                  y: table.y
                }),
            };
            fetch('/user/edit-table' + '?id=' + this.id, requestOptions).then((response) => 
            response.json()
            ).then((data) => console.log(data));
            })
        this.state.stages.forEach(stage =>
            {const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: stage.id,
                    name: stage.name,
                    x: stage.x,
                    y: stage.y
                }),
            };
            fetch('/user/edit-stage' + '?id=' + this.id, requestOptions).then((response) => 
            response.json()
            ).then((data) => console.log(data));
            })
            
        // const requestOptions = {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({
        //     tables: tablesData,
        //   }),
        // };
    
        // fetch('/user/save-layout', requestOptions).then((response) => 
        // response.json()
        // ).then((data) => console.log(data));
    }
    

    renderGuestList = (table) => {
        const { guests } = this.state;
        const tableGuests = guests.filter((guest) => guest.table === table.id);
      
        return (
          <div className="guest-list" style={{ overflowY: 'scroll', maxHeight: '200px' }}>
            {tableGuests.map((guest) => (
              <div key={guest.id}>{guest.name}</div>
            ))}
          </div>
        );
    };
      

    render() {
        const { tables, guests, stages, isLocked } = this.state;

        return (
            <div id='venue-container'
                className='venue-container'
                style={{
                    position: 'relative',
                        height: '800px',
                }}>
                <div
                    id="venue-layout"
                    className="venue-layout"
                    style={{
                        position: 'relative',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '1200px',
                        height: '800px',
                        background: '#f2f2f2',
                        border: '1px solid #ccc',
                    }}
                >
                    {tables.map((table) => (
                        <div
                            key={table.id}
                            className="table"
                            style={{
                                position: 'absolute',
                                left: table.x,
                                top: table.y,
                                width: `${100}px`,
                                height: `${table.capacity * 20}px`,
                                background: '#fff',
                                border: '1px solid #999',
                                borderRadius: '50%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                cursor: 'move',

                            }}
                            onMouseDown={(event) => this.handleObjectMouseDown(event, table.id)}
                            onDrop={(event) => this.handleTableDrop(event, table.id)}
                            onDragOver={this.handleTableDragOver}
                        >
                            {table.id}
                        </div>
                    ))}
                    {stages.map((stage) => (
                        <div
                            key={stage.id}
                            className="stage"
                            style={{
                                position: 'absolute',
                                left: stage.x,
                                top: stage.y,
                                width: `${200}px`,
                                height: `${150}px`,
                                background: `url(${djStageImage})`,
                                backgroundSize: '100% 100%',
                                backgroundRepeat: 'no-repeat',
                                border: '1px solid #999',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'end',
                                padding: '2px',
                                cursor: 'move',

                            }}
                            onMouseDown={(event) => this.handleObjectMouseDown(event, stage.id)}
                            onDragOver={this.handleTableDragOver}
                        >
                            {stage.name}
                        </div>
                    ))}
                </div>
                <div
                    className="guest-list-container"
                    style={{
                        position: 'absolute',
                        bottom: '10px',
                        left: '10px',
                        maxWidth: '200px',
                    }}
                >
                    <h3>Guest List</h3>
                    {tables.map((table) => (
                        <React.Fragment key={table.id}>
                            {table.guests && table.guests.length > 0 && (
                                <div>
                                    <h4>Table {table.name}</h4>
                                    {this.renderGuestList(table)}
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
                <div className="guest-list-container" style={{
                    position: 'absolute',
                    bottom: '10px',
                    right: '10px',
                    maxWidth: '200px',
                }}>

                    <h3>Guest List</h3>

                    <ul>
                        {guests.map((guest) => (
                            <li
                                key={guest.id}
                                draggable
                                onDragStart={(event) => this.handleGuestDragStart(event, guest)}
                            >
                                {guest.name} - Table: {guest.table}
                            </li>
                        ))}
                    </ul>
                </div>
                <Grid item xs={12} align='center'>
                    <ButtonGroup disableElevation variant='contained' color='primary'>
                            <Button color='primary' variant='contained' onClick={this.handleSubmitButtonClick} name="save-layout">Submit Layout</Button>
                            <Button variant='contained' color='secondary' to='/displayTables' component={Link}>Back</Button>
                            <Button variant='contained' color='secondary' onClick={this.handleLockButtonClick}>
                                {isLocked ? 'Unlock Tables' : 'Lock Tables'}
                            </Button>
                    </ButtonGroup>
                </Grid>
            </div>
        );
    }
}

export default VenueLayout;
