import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import { Link } from 'react-router-dom';

function withParams(Component) {
  return (props) => <Component {...props} />;
}

class EditTablePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      capacity: '',
      wedding: null,
    };

    let { id } = this.props.params;
    this.id = id;
    this.getTableDetails();

    this.handleCapacityChange = this.handleCapacityChange.bind(this);
    this.handleWeddingChange = this.handleWeddingChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getTableDetails() {
    fetch('/user/get-table' + '?id=' + this.id).then((response) => 
    response.json()
    ).then((data) => {
        this.setState({
          capacity: data.capacity,
          wedding: data.wedding,
        });
      });
  }

  handleCapacityChange(e) {
    this.setState({ capacity: e.target.value });
  }

  handleWeddingChange(e) {
    this.setState({ wedding: e.target.value });
  }

  handleSubmit() {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: this.id,
        capacity: this.state.capacity,
      }),
    };

    fetch('/user/edit-table' + '?id=' + this.id, requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  render() {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Typography component="h4" variant="h4">
            Edit Table Details
          </Typography>
          <FormControl>
            <TextField
              required={true}
              type="number"
              value={this.state.capacity}
              placeholder={'Capacity'}
              onChange={this.handleCapacityChange}
              inputProps={{
                style: { textAlign: 'center' },
              }}
            />
            <TextField
              required={true}
              type="text"
              value={this.state.wedding}
              placeholder={'Wedding'}
              onChange={this.handleWeddingChange}
              inputProps={{
                style: { textAlign: 'center' },
              }}
            />
            <Button
              color="primary"
              variant="contained"
              name="edit-table"
              to="/displayTables"
              component={Link}
              onClick={this.handleSubmit}
            >
              Update Table Details
            </Button>
          </FormControl>
        </Grid>
        <Grid item xs={12} align="center">
          <Button variant="contained" color="secondary" to="/home" component={Link}>
            Back
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export default withParams(EditTablePage);
