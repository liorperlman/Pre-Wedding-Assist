import React, { Component } from 'react';
import { Button, ButtonGroup, TableContainer, Table, TableHead, TableRow, TableBody, TableCell, Grid, Typography } from '@material-ui/core';
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
            <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
      }}>
                <Typography variant="h4" align='center'>
                        Guest List:
                </Typography>
                <TableContainer style={{border:'1px solid'}}>
                    <Table title="hello">
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
                                            to={'/editGuest/' + guest.id}
                                            component={Link}
                                        >
                                            Edit Guest Details
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
                        <Button color='primary' variant='contained' name="create-guest" to='/createGuest' component={Link}>Create A Guest</Button>
                        <Button color='secondary' variant='contained' name="create-table" to='/createTable' component={Link}>Create A Table</Button>
                    </ButtonGroup>
                </Grid>
                <Grid item xs={6}>
                    
                    {this.renderGuestsTable()}
                </Grid>
            </Grid>
        );
    }
}