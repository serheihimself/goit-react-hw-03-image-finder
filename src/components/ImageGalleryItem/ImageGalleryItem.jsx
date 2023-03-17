import PropTypes from 'prop-types';
import React from 'react';

import {
  ImageGalleryItemStyled,
  GalleryItemImage,
} from './ImageGalleryItem.styles';

const ImageGalleryItem = ({ image, showModal }) => {
  function clickEvent(evt) {
    evt.preventDefault();

    showModal(evt.currentTarget.dataset.url);
  }

  return (
    <ImageGalleryItemStyled
      key={image.id}
      data-url={image.largeImageURL}
      onClick={clickEvent}
    >
      <GalleryItemImage src={image.webformatURL} alt="" />
    </ImageGalleryItemStyled>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  image: PropTypes.array.isRequired,
  showModal: PropTypes.func.isRequired,
};
