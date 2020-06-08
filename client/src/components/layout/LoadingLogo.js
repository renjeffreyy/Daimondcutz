import React from 'react';
import Logo from '../../assets/logo.JPG';

const LoadingLogo = () => {
  return (
    <>
      <img
        src={Logo}
        style={{ width: '200px', margin: 'auto', display: 'block' }}
        alt="Loading..."
      />
    </>
  );
};
export default LoadingLogo;
