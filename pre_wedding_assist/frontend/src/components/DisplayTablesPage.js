import React, { Component } from 'react';
import { Button, ButtonGroup, TableContainer, Table, TableHead, TableRow, TableBody, TableCell, Grid, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import VenueLayout from './VenueLayout';
import WeddingVenue from './WeddingVenue';

export default class DisplayTablesPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tables: [], // Holds the guest data fetched from the server
        };
    }

    componentDidMount() {
        this.fetchTables();
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

    renderTablesTable() {
        const { tables: tables } = this.state;

        if (tables.length === 0) {
            return <Typography variant="body1">No tables found.</Typography>;
        }

        return (
            <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
      }}>
                <Typography variant="h4" align='center'>
                        Table List:
                </Typography>
                <TableContainer style={{border:'1px solid'}}>
                    <Table title="hello">
                        <TableHead>
                            <TableRow>
                                <TableCell>Capacity</TableCell>
                                <TableCell>Wedding</TableCell>
                                <TableCell>Guests</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tables.map((table) => (
                                <TableRow key={table.id}>
                                    <TableCell>{table.guests.reduce((total, guest) => total + guest.quantity, 0) + '/' + table.capacity}</TableCell>
                                    <TableCell>{table.wedding ? table.wedding : 'Not assigned'}</TableCell> {/* Display wedding name or "Not assigned" */}
                                    <TableCell>{table.guests.map((guest) => (
                                                <span key={guest.id}>{guest.name}, </span>
                                                ))}
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            color="primary"
                                            variant="outlined"
                                            size="small"
                                            to={'/assignGuestToTable/' + table.id}
                                            component={Link}
                                        >
                                            Assign To Table
                                        </Button>
                                        <Button
                                            color="primary"
                                            variant="outlined"
                                            size="small"
                                            to={'/editTable/' + table.id}
                                            component={Link}
                                        >
                                            Edit Table Details
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        );
    }

    render() {
        return (
            <Grid alignItems='center'>
                <Grid item xs={12} align='center'>
                    <Typography variant='h3' compact='h3'>
                            Pre-Wedding-Assist
                    </Typography>
                </Grid>
                <Grid item xs={12} align='center'>
                    <ButtonGroup disableElevation variant='contained' color='primary'>
                        <Button color='primary' variant='contained' name="create-table" to='/createTable' component={Link}>Create A Table</Button>
                    </ButtonGroup>
                </Grid>
                <Grid item xs={12} align='center'>
                    <Button variant='contained' color='secondary' to='/home' component={Link}>Back</Button>
                </Grid>
                <Grid item xs={6}>
                    
                    {this.renderTablesTable()}
                </Grid>

                <Grid item xs={12}>
                    
                    <Button color='primary' variant='contained' name="show-venue" to='/showVenue' component={Link}>Show Venue Layout</Button>

                </Grid>
                
            </Grid>
        );
    }
}