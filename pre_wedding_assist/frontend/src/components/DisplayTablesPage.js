import React, { Component } from 'react';
import { Button, ButtonGroup, TableContainer, Table, TableHead, TableRow, TableBody, TableCell, Grid, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import './css/DisplayTablesPage.css';
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
            <div>
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

    renderButtonManual() {
        return (
          <div align='center'>
            <ul style={{ marginTop: '10px' }}>
              <li>
                <strong>Create A Table:</strong> Click this button to create a new table. You can set
                the capacity of the table during the creation process.
              </li>
              <li>
                <strong>Show Venue Layout:</strong> Click this button to view the layout of tables in
                the venue.
              </li>
              <li>
                <strong>Back:</strong> Navigate back to the home page.
              </li>
            </ul>
          </div>
        );
    }
    
    renderTableCreationExplanation() {
        return (
            <div>
            <Typography variant="body1" align='center' style={{ marginTop: '10px' }}>
                Tables' capacities ranging from <strong>3</strong> to <strong>20</strong> guests.
            </Typography>
            <Typography variant="body1" align='center' style={{ marginTop: '10px' }}>
                In order to add a new table, simply specify the desired table's capacity, and the table will be added to your tables' list and to the venue's layout.
            </Typography>
            </div>
        );
    }

    render() {
        return (
            <div className="page-container">
                <Grid alignItems="center">
                    <Grid item xs={12} align="center">
                    <Typography variant="h3" compact="h3">
                        Pre-Wedding-Assist
                    </Typography>
                    </Grid>
                    <Grid item xs={12} align="center">
                    <ButtonGroup disableElevation variant="contained" color="primary">
                        <Button
                        color="primary"
                        variant="contained"
                        name="create-table"
                        to="/createTable"
                        component={Link}
                        >
                        Create A Table
                        </Button>
                    </ButtonGroup>
                    </Grid>
                    <Grid item xs={12} align="center">
                    <Button variant="contained" color="secondary" to="/home" component={Link}>
                        Back
                    </Button>
                    </Grid>
                    
                    <Grid item xs={12} className="table-container" >
                        <Button
                            color="primary"
                            variant="contained"
                            name="show-venue"
                            to="/showVenue"
                            component={Link}
                            >
                        Show Venue Layout
                        </Button>
                    </Grid>
                    <Grid item xs={12} className="table-container">
                        {this.renderButtonManual()}
                    </Grid>
                    <Grid item xs={12} className="table-container">
                        {this.renderTableCreationExplanation()}
                    </Grid>
                    <div className='tables-table'>
                        <Grid item xs={6}>
                            {this.renderTablesTable()}
                        </Grid>
                    </div>
                </Grid>
            </div>
        );
    }
}