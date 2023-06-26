import React, { Component, setState } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormHelperTextField from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { Link } from 'react-router-dom';


export default class CreateTablePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            capacity: ''
        };
        this.handleCapacityChange = this.handleCapacityChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleCapacityChange(e) {
        this.setState({ capacity: e.target.value});    
    }

    handleSubmit() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                capacity: this.state.capacity,
                wedding: null
            }),
        };
        fetch('/user/create-table', requestOptions).then((response) => 
        response.json()
        ).then((data) => console.log(data));
    }

    render() {
        return (<Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Typography component='h4' variant='h4'>
                    Create A Table
                </Typography>
                <FormControl>
                    <TextField required={true} type="number" placeholder={'Capacity'} onChange={this.handleCapacityChange} inputProps={{
                        style: { textAlign: 'center'}
                    }}
                    />
                    <Button color='primary' variant='contained' name="create-table" to='/createTable' component={Link} onClick={this.handleSubmit}>Create Table</Button>
                </FormControl>
            </Grid>
            <Grid item xs={12} align='center'>
                    <Button variant='contained' color='secondary' to='/home' component={Link}>Back</Button>
            </Grid>
        </Grid>);
    }
}