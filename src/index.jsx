// Package dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import {
  Route, Switch, BrowserRouter,
} from 'react-router-dom';


// Component dependencies
import HomePage from './components/HomePage';

ReactDOM.render((
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={HomePage} />
    </Switch>
  </BrowserRouter>), document.getElementById('main'));
