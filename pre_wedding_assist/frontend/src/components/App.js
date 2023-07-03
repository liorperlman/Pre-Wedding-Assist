import React, { Component } from 'react';
import { render} from 'react-dom';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import LandingPage from './LandingPage';
import CreateGuestPage from './CreateGuestPage';
import CreateTablePage from './CreateTablePage';
import GuestPage from './GuestPage';
import TablePage from './TablePage';
import AssignGuestToTablePage from './AssignGuestToTablePage';
import EditGuestPage from './EditGuestPage';
import { BrowserRouter as Router, Switch, Route, Link, Redirect, Routes } from 'react-router-dom';
import DisplayTablesPage from './DisplayTablesPage';
import VenueLayout from './VenueLayout';

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
                    <Route path="/assignGuestToTable/:id" element={<AssignGuestToTablePage/>} />
                    <Route path="/editGuest/:id" element={<EditGuestPage/>} />
                    <Route path="/getGuestsForTable/:table_number" element={<LoginPage/>} />
                    <Route exact path="/displayTables" element={<DisplayTablesPage/>} />
                    <Route exact path="/showVenue" element={<VenueLayout/>} />

                    
                </Routes>
            </Router>
        );
    }

}

const appDiv = document.getElementById('app');
render(<App />, appDiv);