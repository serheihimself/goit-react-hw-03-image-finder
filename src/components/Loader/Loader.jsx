import React from 'react';
import { Audio } from 'react-loader-spinner';
import { Pending } from './Loader.styles';

const Loader = () => {
  return (
    <Pending>
      <Audio
        height="80"
        width="80"
        radius="9"
        color="green"
        ariaLabel="three-dots-loading"
        wrapperStyle
        wrapperClass
      />
    </Pending>
  );
};

export default Loader;
