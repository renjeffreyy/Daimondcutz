import React from 'react';
import { Route, Switch } from 'react-router-dom';

//components
import Login from '../components/auth/login.component';
import Register from '../components/auth/Register.component';
import Appointments from '../components/layout/Appointments';
// import Alert from '../components/layout/Alert';
import PrivateRoute from './PrivateRoutes.component';
import Dashboard from '../components/layout/Dashboard';
import ReviewContainer from '../components/layout/ReviewContainer';

const Routes = (props) => {
  return (
    <>
      {/* <Alert /> */}
      <Switch>
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/Appointments" component={Appointments} />
        <Route exact path="/reviews" component={ReviewContainer} />
      </Switch>
    </>
  );
};

export default Routes;
