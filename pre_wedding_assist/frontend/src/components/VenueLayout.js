import React, { Component } from 'react';

class VenueLayout extends Component {
  state = {
    tables: [],
    guests: [],
    selectedTableId: null,
    offsetX: 0,
    offsetY: 0,
  };

  componentDidMount() {
    this.fetchTables();
    this.fetchGuests();
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

  handleTableMouseDown = (event, tableId) => {
    event.stopPropagation();
    this.setState({
      selectedTableId: tableId,
      offsetX: event.nativeEvent.offsetX,
      offsetY: event.nativeEvent.offsetY,
    });
    document.addEventListener('mousemove', this.handleTableMouseMove);
    document.addEventListener('mouseup', this.handleTableMouseUp);
  };

  handleTableMouseMove = (event) => {
    const { selectedTableId, offsetX, offsetY } = this.state;
    const { clientX, clientY } = event;
    const venueLayout = document.getElementById('venue-layout');
    const venueLayoutRect = venueLayout.getBoundingClientRect();

    const newX = clientX - venueLayoutRect.left - offsetX;
    const newY = clientY - venueLayoutRect.top - offsetY;

    this.setState((prevState) => ({
      tables: prevState.tables.map((table) =>
        table.id === selectedTableId ? { ...table, x: newX, y: newY } : table
      ),
    }));
  };

  handleTableMouseUp = () => {
    this.setState({
      selectedTableId: null,
      offsetX: 0,
      offsetY: 0,
    });
    document.removeEventListener('mousemove', this.handleTableMouseMove);
    document.removeEventListener('mouseup', this.handleTableMouseUp);
  };

  renderGuestList = (guests) => {
    return (
      <div className="guest-list" style={{ overflowY: 'scroll', maxHeight: '200px' }}>
        {guests.map((guest) => (
          <div key={guest.id}>{guest.name}</div>
        ))}
      </div>
    );
  };

  render() {
    const { tables, guests } = this.state;

    return (
      <div
        id="venue-layout"
        className="venue-layout"
        style={{
          position: 'relative',
          width: '800px',
          height: '600px',
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
            onMouseDown={(event) => this.handleTableMouseDown(event, table.id)}
          >
            {table.id}
          </div>
        ))}

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
                  {this.renderGuestList(table.guests)}
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        <div
          className="guest-list-container"
          style={{
            position: 'absolute',
            bottom: '10px',
            right: '10px',
            maxWidth: '200px',
          }}
        >
          <h3>All Guests</h3>
          {this.renderGuestList(guests)}
        </div>
      </div>
    );
  }
}

export default VenueLayout;
