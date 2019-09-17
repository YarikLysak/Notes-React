import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';
import notesUrl from '../../notesUrl';
import Notes from '../Notes';

import { Fab } from '@material-ui/core';

class Archive extends Component {
  state = {
    notes: [],
  };

  componentDidMount() {
    this.getNote();
  }

  getNote = () => {
    axios.get(`${notesUrl}?isArchive=true`).then(res => {
      const notes = res.data;
      this.setState({ notes });
    });
  };

  deleteNote = deletedId => {
    axios.delete(`${notesUrl}/${deletedId}`).then(() => {
      this.setState({
        notes: this.state.notes.filter(item => item.id !== deletedId),
      });
    });
  };

  markAsDone = (doneItemId, isChecked) => {
    axios.patch(`${notesUrl}/${doneItemId}`, { done: isChecked }).then(res => {
      this.setState(({ notes }) => ({
        notes: notes.map(item => (item.id !== doneItemId ? item : res.data)),
      }));
    });
  };

  markAsArchived = (archivedId, isArchive) => {
    axios.patch(`${notesUrl}/${archivedId}`, { isArchive }).then(res => {
      this.setState(({ notes }) => ({
        notes: notes
          .map(item => (item.id !== archivedId ? item : res.data))
          .filter(item => item.isArchive === true),
      }));
    });
  };

  render() {
    return (
      <div style={{ display: 'flex' }}>
        <Notes
          notes={this.state.notes}
          deleteNote={this.deleteNote}
          markAsDone={this.markAsDone}
          markAsArchived={this.markAsArchived}
        />
        <Fab component={Link} to="/" color="primary" aria-label="Back">
          BACK
        </Fab>
      </div>
    );
  }
}

export default Archive;
