import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadUser } from '../../actions/auth';

const Dashboard = ({ auth: { user } }) => {
  useEffect(() => {
    loadUser();
  }, []);
  return (
    <>
      <p>Welcome {user.firstName}</p>

      <p>Upcoming appointments</p>
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { loadUser })(Dashboard);
