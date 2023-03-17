import PropTypes from 'prop-types';
import React from 'react';

import { ButtonStyled } from './Button.style';

const Button = ({ loadMore }) => {
  return (
    <ButtonStyled type="button" onClick={loadMore}>
      Load more
    </ButtonStyled>
  );
};

export default Button;

Button.propTypes = {
  loadMore: PropTypes.func.isRequired,
};
