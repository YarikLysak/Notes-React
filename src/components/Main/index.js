import React, { Component } from 'react';

import Header from '../Header';
import CreateNote from '../Notes/CreateNote';
import Notes from '../Notes';

import axios from 'axios';
import notesUrl from '../../notesUrl';

class Main extends Component {
  state = {
    isOpen: false,
    isEdit: false,
    editable: {},
    filterString: '',

    notes: [],
    filteredNotes: [],
  };

  componentDidMount() {
    this.getNotes();
  }

  getNotes = () => {
    axios.get(`${notesUrl}?isArchive=false`).then(res => {
      const notes = res.data;
      this.setState({ notes });
      this.clearFilter();
    });
  };

  deleteNote = deletedId => {
    axios.delete(`${notesUrl}/${deletedId}`).then(() => {
      this.setState({
        notes: this.state.notes.filter(item => item.id !== deletedId),
      });
      this.clearFilter();
    });
  };

  markAsDone = (doneItemId, isChecked) => {
    axios.patch(`${notesUrl}/${doneItemId}`, { done: isChecked }).then(res => {
      this.setState(({ notes }) => ({
        notes: notes.map(item => (item.id !== doneItemId ? item : res.data)),
      }));
      this.clearFilter();
    });
  };

  clearFilter = () => {
    this.setState(({ notes }) => ({ filteredNotes: notes, filterString: '' }));
  };

  markAsArchived = (archivedId, isArchive) => {
    axios.patch(`${notesUrl}/${archivedId}`, { isArchive }).then(res => {
      this.setState(({ notes }) => ({
        notes: notes
          .map(item => (item.id !== archivedId ? item : res.data))
          .filter(item => item.isArchive === false),
      }));
      this.clearFilter();
    });
  };

  handleOpenModal = () => {
    this.setState(() => ({
      isOpen: true,
    }));
  };

  handleCloseModal = () => {
    this.setState(() => ({
      isOpen: false,
      editable: {},
      isEdit: false,
    }));
  };

  onCreateNote = createNote => {
    this.setState(({ notes }) => ({
      notes: [...notes, createNote],
    }));

    this.clearFilter();
  };

  showFiltered = filterString => {
    const query = filterString.toLowerCase();

    this.setState(({ notes }) => ({
      filterString: filterString,
      filteredNotes: notes.filter(item => {
        const title = item.title.toLowerCase();
        const content = item.content.toLowerCase();

        return title.includes(query) || content.includes(query);
      }),
    }));
  };

  render() {
    return (
      <div>
        <Header
          handleOpen={this.handleOpenModal}
          showFiltered={this.showFiltered}
          filterString={this.state.filterString}
        />
        <CreateNote
          isOpen={this.state.isOpen}
          handleClose={this.handleCloseModal}
          onCreateNote={this.onCreateNote}
        />
        <Notes
          notes={this.state.filteredNotes}
          deleteNote={this.deleteNote}
          markAsDone={this.markAsDone}
          markAsArchived={this.markAsArchived}
        />
      </div>
    );
  }
}

export default Main;
