import React, { Component, setState } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormHelperTextField from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { Link } from 'react-router-dom';


export default class CreateGuestPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            quantity: '',
            group: '',
            phone_number: ''
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleQuantityChange = this.handleQuantityChange.bind(this);
        this.handleGroupChange = this.handleGroupChange.bind(this);
        this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleNameChange(e) {
        this.setState({ name: e.target.value});
    }
    handleQuantityChange(e) {
        this.setState({ quantity: e.target.value});
    }
    handleGroupChange(e) {
        this.setState({ group: e.target.value});
    }
    handlePhoneNumberChange(e) {
        this.setState({ phone_number: e.target.value});
    }
    handleSubmit() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: this.state.name,
                quantity: this.state.quantity,
                group: this.state.group,
                phone_number: this.state.phone_number,
                is_attending: false,
                table: null
            }),
        };
        fetch('/user/create-guest', requestOptions).then((response) => 
        response.json()
        ).then((data) => console.log(data));
    }

    render() {
        return (<Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Typography component='h4' variant='h4'>
                    Create A Guest
                </Typography>
                <FormControl>
                    <TextField required={true} type="text" placeholder={'Full Name'} onChange={this.handleNameChange} inputProps={{
                        style: { textAlign: 'center'}
                    }}
                    />
                    <TextField required={true} type="number" placeholder={'Quantity'} onChange={this.handleQuantityChange} inputProps={{
                        style: { textAlign: 'center'}
                    }}
                    />
                    <TextField required={true} type="text" placeholder={'Group'} onChange={this.handleGroupChange} inputProps={{
                        style: { textAlign: 'center'}
                    }}
                    />
                    <TextField required={true} type="text" placeholder={'Phone Number'} onChange={this.handlePhoneNumberChange} inputProps={{
                        style: { textAlign: 'center'}
                    }}
                    />
                    <Button color='primary' variant='contained' name="create-guest" to='/createGuest' component={Link} onClick={this.handleSubmit}>Create Guest</Button>
                </FormControl>
            </Grid>
            <Grid item xs={12} align='center'>
                    <Button variant='contained' color='secondary' to='/home' component={Link}>Back</Button>
            </Grid>
        </Grid>);
    }
}