import React, { Component } from 'react';
import { useParams } from 'react-router-dom';


function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
  }

class GuestPage extends Component {

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

    render() {
        return (
            <div>
                <p>Guest ID: {this.id.toString()}</p>
                <p>Name: {this.state.name.toString()}</p>
                <p>Quantity: {this.state.quantity.toString()}</p>
                <p>Group: {this.state.group.toString()}</p>
                <p>Phone Number: {this.state.phone_number.toString()}</p>
                <p>Attending: {this.state.is_attending.toString()}</p>
                
                

            </div>
        );
    }
}
export default withParams(GuestPage);