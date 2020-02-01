// Package dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import {
  Route, Switch, BrowserRouter,
} from 'react-router-dom';


// Component dependencies
import Viewer from './components/viewer/ViewerPage';
import Builder from './components/builder/BuilderPage';

ReactDOM.render((
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Builder} />
    </Switch>
  </BrowserRouter>), document.getElementById('main'));
