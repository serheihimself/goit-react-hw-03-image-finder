import PropTypes from 'prop-types';
import React from 'react';

import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryStyled } from './ImageGallery.styles';

const ImageGallery = ({ images, showModal }) => {
  return (
    <ImageGalleryStyled>
      {images.map(image => (
        <ImageGalleryItem image={image} showModal={showModal} />
      ))}
    </ImageGalleryStyled>
  );
};

export default ImageGallery;

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  showModal: PropTypes.func.isRequired,
};
