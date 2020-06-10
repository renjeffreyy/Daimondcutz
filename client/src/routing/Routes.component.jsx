import React from 'react';
import { Route, Switch } from 'react-router-dom';

//components
import Login from '../components/auth/Login.component';
import Register from '../components/auth/Register.component';
import Appointments from '../components/layout/Appointments';
import Alert from '../components/layout/Alert';
import PrivateRoute from './PrivateRoutes.component';
import Dashboard from '../components/layout/Dashboard';
import ReviewContainer from '../components/layout/ReviewContainer';

const Routes = (props) => {
  return (
    <section>
      <Alert />
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/Appointments" component={Appointments} />
        <Route exact path="/reviews" component={ReviewContainer} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
      </Switch>
    </section>
  );
};

export default Routes;
