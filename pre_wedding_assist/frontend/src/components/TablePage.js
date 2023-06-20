import React, { Component } from 'react';
import { useParams } from 'react-router-dom';


function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}

class TablePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            capacity: '',
            wedding: null
        };
        let { id } = this.props.params;
        this.id = id;
        this.getTableDetails();
    }

    getTableDetails() {
        fetch('/user/get-table' + '?id=' + this.id).then((response) => 
        response.json()
        ).then((data) => {
            this.setState({
                capacity: data.capacity,
                wedding: data.wedding
            });
        });
    }

    render() {
        return (
            <div>
                <p>Table ID: {this.id.toString()}</p>
                <p>Capacity: {this.state.capacity.toString()}</p>
                
            </div>
        );
    }
}
export default withParams(TablePage);