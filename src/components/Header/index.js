import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import StorageIcon from '@material-ui/icons/Storage';
import { withStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';

const styles = theme => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '1em',
  },
});

class Header extends Component {

  _handlerChange = ({ target: { value } }) => {
    this.props.showFiltered(value)
  }

  render() {
    const { classes } = this.props;
    return (
      <header className={classes.header}>
        <div style={{ width: '50%', minWidth: '200px' }}>
          <TextField
            margin="dense"
            id="search"
            label="&#128269; search"
            type="text"
            fullWidth
            value={this.props.filterString}
            onChange={this._handlerChange}
          />
        </div>
        <div>
          <Fab color="primary" aria-label="Add" component={Link} to="/archive" style={{ marginRight: "1em" }}>
            <StorageIcon />
          </Fab>
          <Fab color="primary" aria-label="Add" onClick={this.props.handleOpen}>
            <AddIcon />
          </Fab>
        </div>
      </header>
    );
  }
}

export default withStyles(styles)(Header);
