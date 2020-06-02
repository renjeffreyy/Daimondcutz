import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import './App.css';
import store from './store';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Landing from './components/landing/landing.component';
import Login from './components/auth/login.component';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Switch>
            <Route exact path="/" component={Landing} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
