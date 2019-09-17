import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';

import MenuExpanded from './MenuExpanded';

class Note extends Component {
  render() {
    return (
      <Card>
        <CardHeader
          action={
            <MenuExpanded
              id={this.props.id}
              done={this.props.done}
              isArchive={this.props.isArchive}
              deleteNote={this.props.deleteNote}
              markAsDone={this.props.markAsDone}
              markAsArchived={this.props.markAsArchived}
            />
          }
          title={this.props.title}
          subheader={this.props.createdAt}
        />
        <CardContent>
          <Typography component="p">{this.props.content}</Typography>
        </CardContent>
      </Card>
    );
  }
}

Note.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  content: PropTypes.string,
  createdAt: PropTypes.string,
  done: PropTypes.bool,
  isArchive: PropTypes.bool
};

export default Note;
