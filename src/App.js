import React, { Component, Fragment } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router';

import CssBaseline from '@material-ui/core/CssBaseline';

import Main from './components/Main';
import EditNote from './components/Notes/EditNote';
import Archive from './components/Archive';

class App extends Component {
  render() {
    return (
      <Fragment>
        <CssBaseline />
        <BrowserRouter>
          <div className="App" style={{ padding: '1em' }}>
            <Route exact path="/" component={Main} />
            <Route exact path="/edit/:id" component={EditNote} />
            <Route exact path="/archive" component={Archive} />
          </div>
        </BrowserRouter>
      </Fragment>
    );
  }
}

export default App;
