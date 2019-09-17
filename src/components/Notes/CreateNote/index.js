import React, { Component } from 'react';

import axios from 'axios';

import notesUrl from '../../../notesUrl';

import {
  TextField,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
} from '@material-ui/core';

class CreateNote extends Component {
  state = {
    title: '',
    content: '',
    createdAt: '',
    done: false,
    isArchive: false,
  };

  _handleCreatedNote = () => {
    axios
      .post(notesUrl, {
        ...this.state,
        createdAt: this._getCreatedAt(),
      })
      .then(res => {
        this.props.onCreateNote(res.data);
        this._closeModal();
      });
  };

  _clearState = () => {
    this.setState({
      title: '',
      content: '',
      createdAt: '',
      done: false,
      isArchive: false,
    });
  };

  _handleNoteData = ({ target: { id, value } }) => {
    this.setState({
      [id]: value,
    });
  };

  _generateDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const time = date.getTime();

    return { day, month, year, time };
  };

  _getCreatedAt = () => {
    const { day, month, year } = this._generateDate();
    const formatedMonth = month < 10 ? '0' + (month + 1) : month;

    return `${day}.${formatedMonth}.${year}`;
  };

  _closeModal = () => {
    this._clearState();
    this.props.handleClose();
  };

  render() {
    return (
      <div>
        <Dialog
          open={this.props.isOpen}
          onClose={this._closeModal}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">CREATE NOTE</DialogTitle>
          <DialogContent>
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
          </DialogContent>
          <DialogActions>
            <Button onClick={this._closeModal}>Cancel</Button>
            <Button onClick={this._handleCreatedNote} color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default CreateNote;
