import React, { Component } from 'react';
import { render} from 'react-dom';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import LandingPage from './LandingPage';
import CreateGuestPage from './CreateGuestPage';
import CreateTablePage from './CreateTablePage';
import GuestPage from './GuestPage';
import TablePage from './TablePage';
import { BrowserRouter as Router, Switch, Route, Link, Redirect, Routes } from 'react-router-dom';

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <Routes>
                    <Route exact path="/" element={<LandingPage/>} />
                    <Route exact path="/login" element={<LoginPage/>} />
                    <Route exact path="/home" element={<HomePage/>} />
                    <Route exact path="/createGuest" element={<CreateGuestPage/>} />
                    <Route exact path="/createTable" element={<CreateTablePage/>} />
                    <Route path="/table/:id" element={<TablePage/>} />
                    <Route path="/guest/:id" element={<GuestPage/>} />
                </Routes>
            </Router>
        );
    }

}

const appDiv = document.getElementById('app');
render(<App />, appDiv);