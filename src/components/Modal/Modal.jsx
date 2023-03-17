import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Overlay, ModalStyled } from './Modal.styles';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onClose);
  }

  onClose = e => {
    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  };

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onClose);
  }

  render() {
    return (
      <Overlay onClick={this.props.closeModal}>
        <ModalStyled>
          <img src={this.props.image} alt="big mode" />
        </ModalStyled>
      </Overlay>
    );
  }
}
export default Modal;

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};
