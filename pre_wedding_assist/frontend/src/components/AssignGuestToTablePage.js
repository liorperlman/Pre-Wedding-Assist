import React, { Component } from 'react';
import { TextField, Button, Grid, Typography } from '@material-ui/core';
import { Link, useParams } from 'react-router-dom';


function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}

class AssignGuestToTablePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            table:"",
            error:""
        }
        let { id } = this.props.params;
        this.id = id;
        this.getGuestDetails();

        this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
        this.assignTableButtonPressed = this.assignTableButtonPressed.bind(this);
    }

    getGuestDetails() {
        fetch('/user/get-guest' + '?id=' + this.id).then((response) => 
        response.json()
        ).then((data) => {
            this.setState({
                table: data.table
            });
        });
    }
    
    handleTextFieldChange(e) {
        this.setState({
            table: e.target.value,
        });
    }
    assignTableButtonPressed() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: this.id,
                table: this.state.table
            })
        };
        fetch('/user/assign-guest-to-table' + '?id=' + this.id, requestOptions).then((response) => 
        response.json()
        ).then((data) => console.log(data));
    }
    
    render() {
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} align='center'>
                    <Typography variant='h4' conponent='h4'>
                        Assign Guest To Table
                    </Typography>
                </Grid>

                <Grid item xs={12} align='center'>
                    <TextField
                        error={this.state.error}
                        label='Table Number'
                        placeholder='Enter a Table Number'
                        value={this.state.table}
                        helperText={this.state.error}
                        variant='outlined'
                        onChange={this.handleTextFieldChange}/>
                </Grid>
                <Grid item xs={12} align='center'>
                    <Button variant='contained' color='primary' to='/home' component={Link} onClick={this.assignTableButtonPressed}>Save</Button>
                </Grid>
                <Grid item xs={12} align='center'>
                    <Button variant='contained' color='secondary' to='/home' component={Link}>Back</Button>
                </Grid>
            </Grid>
        );
    }

}

export default withParams(AssignGuestToTablePage);
