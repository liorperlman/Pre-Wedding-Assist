import React, { Component } from 'react';
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
    }

    render() {
        return (<Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Typography component='h4' variant='h4'>
                    Create A Table
                </Typography>
                <FormControl>
                    <TextField required={true} type="number" placeholder={'Capacity'} inputProps={{
                        style: { textAlign: 'center'}
                    }}
                    />
                    <Button color='primary' variant='contained' name="create-table" to='/createTable' component={Link}>Create Table</Button>

                </FormControl>
            </Grid>

        </Grid>);
    }
}