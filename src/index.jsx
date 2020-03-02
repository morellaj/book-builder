/* eslint-disable no-unused-vars */
// Package dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/browser';
import {
  Route, Switch, BrowserRouter,
} from 'react-router-dom';

// Component dependencies
import Viewer from './components/viewer/ViewerPage';
import Builder from './components/builder/BuilderPage';

// Sentry.init({ dsn: 'https://64e1bc15d4614d1c8627828b1539e3b9@sentry.io/2252261' });

ReactDOM.render((
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Builder} />
    </Switch>
  </BrowserRouter>), document.getElementById('main'));
