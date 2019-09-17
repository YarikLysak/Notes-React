import React, { Component } from 'react';
import Note from './Note';

import Grid from '@material-ui/core/Grid';

class Notes extends Component {
  render() {
    return (
      <Grid container spacing={16}>
        {this.props.notes.map(item => (
          <Grid item key={item.id} xs={12} md={3}>
            <Note
              id={item.id}
              title={item.title}
              content={item.content}
              createdAt={item.createdAt}
              done={item.done}
              isArchive={item.isArchive}
              deleteNote={this.props.deleteNote}
              markAsDone={this.props.markAsDone}
              markAsArchived={this.props.markAsArchived}
            />
          </Grid>
        ))}
      </Grid>
    );
  }
}

export default Notes;
