import React, { Component } from 'react';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';



export default class LoginPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <Typography component='h4' variant='h4'>
                        Login
                    </Typography>
                </Grid>

                <Grid item xs={12} align="center">
                    <FormControl>
                        <TextField required={true} type="text" placeholder={'email@gmail.com'} inputProps={{
                            style: { textAlign: 'center'}
                        }}
                        />
                        <TextField required={true} type="password" placeholder={'password'} inputProps={{
                            style: { textAlign: 'center'}
                        }}
                        />
                        <Button color='primary' variant='contained' name="login" to='/home' component={Link}>Login</Button>

                    </FormControl>
                </Grid>

                

            </Grid>

        );
    }
}