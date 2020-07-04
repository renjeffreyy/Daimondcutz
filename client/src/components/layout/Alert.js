import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

const AlertDiv = styled.div`
  width: 100vw;
  padding: 10px;
  /* background-color: red; */
  color: white;
`;

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
    <AlertDiv key={alert.id} className={`${alert.alertType}`}>
      {alert.msg}
    </AlertDiv>
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
