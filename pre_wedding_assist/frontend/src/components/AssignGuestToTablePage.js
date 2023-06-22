import React, { Component } from 'react';
import { TextField, Button, Grid, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

export default class AssignGuestToTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableNumber:"",
            error:""
        }
        this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
        this.assignTableButtonPressed = this.assignTableButtonPressed.bind(this);
    }

    render() {
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} align='center'>
                    <Typography variant='h4' conponent='h4'>
                        Join a Table
                    </Typography>
                </Grid>

                <Grid item xs={12} align='center'>
                    <TextField
                        error={this.state.error}
                        label='Table Number'
                        placeholder='Enter a Table Number'
                        value={this.state.tableNumber}
                        helperText={this.state.error}
                        variant='outlined'
                        onChange={this.handleTextFieldChange}/>
                </Grid>
                <Grid item xs={12} align='center'>
                    <Button variant='contained' color='primary' to='/home' onClick={this.assignTableButtonPressed}>Enter Table Number</Button>
                </Grid>
                <Grid item xs={12} align='center'>
                    <Button variant='contained' color='secondary' to='/' component={Link}>Back</Button>
                </Grid>
            </Grid>
        );
    }

    handleTextFieldChange(e) {
        this.setState({
            tableNumber: e.target.value,
        });
    }
    assignTableButtonPressed() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: this.state.tableNumber
            })
        };
        fetch('/user/assign-guest-to-table', requestOptions).then((response) => {
            if (response.ok){
                console.log(response);
                window.location.href = '/home'
                // this.props.history.push('/login')
            } else {
                this.setState({error: "Table not found."})
            }
        })
        .catch((error) => {
            console.log(error)    
        });
    }
}
