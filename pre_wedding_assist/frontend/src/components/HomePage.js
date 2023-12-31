import React, { Component } from 'react';
import { Button, ButtonGroup, TableContainer, Table, TableHead, TableRow, TableBody, TableCell, Grid, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import './css/HomePage.css';

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
            <div >
                <Typography variant="h4" align='center'>
                        Guest List:
                </Typography>
                <TableContainer style={{border:'1px solid'}}>
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
                                            to={'/assignGuestToTable/' + guest.id}
                                            component={Link}
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
            <div className="page-container">
                <Grid container alignItems='center' spacing={3}>
                    <Grid item xs={12} align='center'>
                    <Typography variant='h3' color='primary'>
                        Welcome to Pre-Wedding-Assist
                    </Typography>
                    </Grid>
                    <Grid item xs={12} align='center'>
                    <ButtonGroup disableElevation variant='contained' color='primary'>
                        <Button color='primary' variant='contained' name="create-guest" to='/createGuest' component={Link}>
                        Create A Guest
                        </Button>
                        <Button color='secondary' variant='contained' name="create-table" to='/createTable' component={Link}>
                        Create A Table
                        </Button>
                    </ButtonGroup>
                    </Grid>
                    <Grid item xs={12} align='center'>
                    <ButtonGroup disableElevation variant='contained' color='primary'>
                        <Button color='secondary' variant='contained' name="display-tables" to='/displayTables' component={Link}>
                        Display Tables
                        </Button>
                    </ButtonGroup>
                    </Grid>
                    <Grid item xs={12} align='center'>
                        <Typography variant='h4' color='primary'>
                            Your Wedding Planning Journey Starts Here
                        </Typography>
                        <Typography variant='body1'>
                            Congratulations on your upcoming wedding! Pre-Wedding-Assist is here to make your wedding planning journey smooth and stress-free. Explore the features and tools to manage your guest list, create seating arrangements, and more.
                        </Typography>
                        <Typography variant='body1'>
                            Quick Actions:
                        </Typography>
                        <ul>
                            <li>Create A Guest: Add your guests and manage their details.</li>
                            <li>Create A Table: Plan your seating arrangements with ease.</li>
                            <li>Display Tables: View and organize your created tables.</li>
                        </ul>
                        <Typography variant='body1'>
                            Need assistance? Feel free to reach out to our support team.
                        </Typography>
                    </Grid>
                    <div className='guest-table'>
                        <Grid item xs={12}>
                            {this.renderGuestsTable()}
                        </Grid>
                    </div>
                </Grid>
            </div>
        );
    }
}