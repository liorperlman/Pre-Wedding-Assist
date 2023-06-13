import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';


export default class LandingPage extends Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <div>
            <p>This is the landing page</p>
            <Button color='primary' variant='contained' name="login" to='/login' component={Link}>Login</Button>
        </div>
        );
    }
}