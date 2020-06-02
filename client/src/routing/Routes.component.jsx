import React from 'react';
import { Route, Switch } from 'react-router-dom';

//components
import Login from '../components/auth/Login.component';
import Register from '../components/auth/Register.component';
import Calander from '../components/calander/Calander.component';

const Routes = (props) => {
  return (
    <section>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/calander" component={Calander} />
      </Switch>
    </section>
  );
};

export default Routes;
