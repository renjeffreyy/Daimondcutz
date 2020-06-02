import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import './App.css';
import store from './store';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Landing from './components/landing/Landing.component';
import Routes from './routing/Routes.component';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route component={Routes} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
