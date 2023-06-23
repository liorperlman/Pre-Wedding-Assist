import React, { Component, setState } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormHelperTextField from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { Link, useParams } from 'react-router-dom';
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";


function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
  }


class EditGuestPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            quantity: '',
            group: '',
            phone_number: '',
            is_attending: false,
            table: null
        };
        let { id } = this.props.params;
        this.id = id;
        this.getGuestDetails();
        
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleQuantityChange = this.handleQuantityChange.bind(this);
        this.handleGroupChange = this.handleGroupChange.bind(this);
        this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this);
        this.handleIsAttendingChange = this.handleIsAttendingChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getGuestDetails() {
        fetch('/user/get-guest' + '?id=' + this.id).then((response) => 
        response.json()
        ).then((data) => {
            this.setState({
                name: data.name,
                quantity: data.quantity,
                group: data.group,
                phone_number: data.phone_number,
                is_attending: data.is_attending,
                table: data.table
            });
        });
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
    handleIsAttendingChange(e) {
        this.setState({
            is_attending: e.target.value === "true" ? true : false,
          });    }
    handleGuestCanPauseChange(e) {
        
      }
    handleSubmit() {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: this.id,
                name: this.state.name,
                quantity: this.state.quantity,
                group: this.state.group,
                phone_number: this.state.phone_number,
                is_attending: this.state.is_attending
            }),
        };
        fetch('/user/edit-guest', requestOptions).then((response) => 
        response.json()
        ).then((data) => console.log(data));
    }

    render() {
        return (<Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Typography component='h4' variant='h4'>
                    Edit Guest Details
                </Typography>
                <FormControl>
                    <TextField required={true} type="text" value={this.state.name} placeholder={'Full Name'} onChange={this.handleNameChange} inputProps={{
                        style: { textAlign: 'center'}
                    }}
                    />
                    <TextField required={true} type="number" value={this.state.quantity} placeholder={'Quantity'} onChange={this.handleQuantityChange} inputProps={{
                        style: { textAlign: 'center'}
                    }}
                    />
                    <TextField required={true} type="text" value={this.state.group} placeholder={'Group'} onChange={this.handleGroupChange} inputProps={{
                        style: { textAlign: 'center'}
                    }}
                    />
                    <TextField required={true} type="text" value={this.state.phone_number} placeholder={'Phone Number'} onChange={this.handlePhoneNumberChange} inputProps={{
                        style: { textAlign: 'center'}
                    }}
                    />
                    <FormHelperText>
                        <div align="center">Attendance Status:</div>
                    </FormHelperText>
                    <RadioGroup 
                        row
                        value={this.state.is_attending.toString()}
                        onChange={this.handleIsAttendingChange}
                    >
                        <FormControlLabel
                            value="true"
                            control={<Radio color="primary" />}
                            label="Yes"
                            labelPlacement="bottom"
                        />
                        <FormControlLabel
                            value="tentative"
                            control={<Radio color="green" />}
                            label="Maybe"
                            labelPlacement="bottom"
                        />
                        <FormControlLabel
                            value="false"
                            control={<Radio color="secondary" />}
                            label="No"
                            labelPlacement="bottom"
                        />
                    </RadioGroup>
                    <Button color='primary' variant='contained' name="edit-guest" to='/editGuest' component={Link} onClick={this.handleSubmit}>Update Guest Details</Button>
                </FormControl>
            </Grid>
        </Grid>);
    }
}
export default withParams(EditGuestPage);