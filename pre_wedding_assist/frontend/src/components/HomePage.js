import React, { Component } from 'react';
import { Button, TableContainer, Table, TableHead, TableRow, TableBody, TableCell, Grid, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            guests: [], // Holds the guest data fetched from the server
        };
    }

    componentDidMount() {
        this.fetchGuests();
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

    renderGuestsTable() {
        const { guests } = this.state;

        if (guests.length === 0) {
            return <Typography variant="body1">No guests found.</Typography>;
        }

        return (
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Group</TableCell>
                            <TableCell>Phone Number</TableCell>
                            <TableCell>Attending</TableCell>
                            <TableCell>Table</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {guests.map((guest) => (
                            <TableRow key={guest.id}>
                                <TableCell>{guest.name}</TableCell>
                                <TableCell>{guest.quantity}</TableCell>
                                <TableCell>{guest.group}</TableCell>
                                <TableCell>{guest.phone_number}</TableCell>
                                <TableCell>{guest.is_attending ? 'Yes' : 'No'}</TableCell>
                                <TableCell>{guest.table ? guest.table : 'Not assigned'}</TableCell> {/* Display table name or "Not assigned" */}
                                <TableCell>
                                    <Button
                                        color="primary"
                                        variant="outlined"
                                        size="small"
                                        onClick={() => this.viewGuestDetails(guest.id)}
                                    >
                                        Assign To Table
                                    </Button>
                                    <Button
                                        color="primary"
                                        variant="outlined"
                                        size="small"
                                        onClick={() => this.viewGuestDetails(guest.id)}
                                    >
                                        Edit Guest Details
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }

    render() {
        return (
            <div alignItems='center'>
                <div align='center'>
                    <Button align='center' color='primary' variant='contained' name="create-guest" to='/createGuest' component={Link}>Create A Guest</Button>
                    <Button  color='primary' variant='contained' name="create-table" to='/createTable' component={Link}>Create A Table</Button>
                </div>
                <div className='center'>
                    <Typography variant="h6" gutterBottom>
                        Guests
                    </Typography>
                    {this.renderGuestsTable()}
                </div>
            </div>
        );
    }
}