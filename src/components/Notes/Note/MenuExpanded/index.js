import React from 'react';
import { withRouter } from 'react-router';

import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DoneIcon from '@material-ui/icons/Done';

const options = ['Edit', 'Done', 'Archive', 'Delete'];

const ITEM_HEIGHT = 48;

class MenuExpanded extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleType = currentType => () => {
    currentType = currentType.toLowerCase();

    switch (currentType) {
      case 'edit':
        this.props.history.push(`/edit/${this.props.id}`);
        break;
      case 'done':
        this.props.markAsDone(this.props.id, !this.props.done);
        break;
      case 'archive':
        this.props.markAsArchived(this.props.id, !this.props.isArchive);
        break;
      case 'delete':
        this.props.deleteNote(this.props.id);
        break;
      default:
        console.log('hello');
    }

    this.handleClose();
  };

  _getOptionLabel = (option) => {
    if (option === 'Done') {
      return this.props.done ? 'Undone' : option
    } else if (option === 'Archive') {
      return this.props.isArchive ? 'Unarchived' : option
    }
    return option
  }

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    return (
      <div>
        <IconButton aria-label="Done" aria-owns="Done" disabled={true}>
          {this.props.done ? <DoneIcon /> : null}
        </IconButton>
        <IconButton
          aria-label="More"
          aria-owns={open ? 'long-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <MoreVertIcon />
        </IconButton>

        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={this.handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: 200,
            },
          }}
        >
          {options.map(option => (
            <MenuItem
              key={option}
              option={option}
              onClick={this.handleType(option)}
            >
              {this._getOptionLabel(option)}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
}

export default withRouter(MenuExpanded);
