import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

import axios from 'axios';

import notesUrl from '../../../notesUrl';

import { TextField, Button, Typography } from '@material-ui/core';

const coolStyles = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  width: '40%',
};

class EditNote extends Component {
  constructor(props) {
    super(props);
    this.id = props.match.params.id;
  }

  state = {};

  componentDidMount() {
    axios.get(`${notesUrl}/${this.id}`).then(res => {
      const note = res.data;

      this.setState(() => ({ ...note }));
    });
  }

  _handleUpdate = () => {
    axios.put(`${notesUrl}/${this.id}`, this.state);
  };

  _handleNoteData = ({ target: { id, value } }) => {
    this.setState({
      [id]: value,
    });
  };

  render() {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Button component={Link} to="/" style={{ alignSelf: 'flex-start' }}>
          BACK
        </Button>
        <div style={coolStyles}>
          <div id="form-dialog-title" style={{ alignSelf: 'center' }}>
            <Typography variant="h5">EDIT NOTE</Typography>
          </div>
          <TextField
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            value={this.state.title || ''}
            onChange={this._handleNoteData}
          />
          <TextField
            margin="dense"
            id="content"
            label="Content"
            type="text"
            fullWidth
            value={this.state.content || ''}
            onChange={this._handleNoteData}
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={this._handleUpdate} color="primary">
              Update
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(EditNote);
