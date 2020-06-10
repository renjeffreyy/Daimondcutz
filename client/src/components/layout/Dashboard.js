import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadUser } from '../../actions/auth';

const Dashboard = ({ firstName }) => {
  useEffect(() => {
    loadUser();
  }, []);
  return (
    <>
      {firstName && <p>Welcome {firstName}</p>}

      <p>Upcoming appointments</p>
    </>
  );
};

const mapStateToProps = (state) => ({
  firstName: state.auth.user.firstName,
});

export default connect(mapStateToProps, { loadUser })(Dashboard);
