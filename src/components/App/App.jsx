import React, { Component } from 'react';
import Searchbar from '../Searchbar/Searchbar';
import Modal from '../Modal/Modal';
import Loader from '../Loader/Loader';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from '../Button/Button';
import { Container } from './App.styles';

const API_KEY = '32953122-2dcf40f65e2637fc605cd2cf8';

class App extends Component {
  state = {
    search: '',
    images: [],
    page: 1,
    pending: false,
    modal: '',
  };

  searchNewImage = async inputValue => {
    this.setState({ search: inputValue, page: 1, pending: true }, async () => {
      const images = await this.searchImage();
      this.setState({ images, pending: false });
    });
  };

  loadMoreButton = async () => {
    this.setState(
      prev => ({ page: prev.page + 1, pending: true }),
      async () => {
        const images = await this.searchImage();
        this.setState(prev => ({
          images: [...prev.images, ...images],
          pending: false,
        }));
      }
    );
  };

  searchImage = async () => {
    const resp = await fetch(
      `https://pixabay.com/api/?q=${this.state.search}&page=${this.state.page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    );
    if (!resp.ok) {
      throw new Error(`fetch failed`);
    }
    const body = await resp.json();
    return body.hits.map(el => {
      return {
        id: el.id,
        webformatURL: el.webformatURL,
        largeImageURL: el.largeImageURL,
      };
    });
  };

  showModal = imageId => {
    this.setState({ modal: imageId });
  };

  closeModal = () => {
    this.setState({ modal: '' });
  };

  render() {
    const { images, pending, modal } = this.state;
    return (
      <Container>
        <Searchbar onSubmit={this.searchNewImage} />
        <ImageGallery images={images} showModal={this.showModal} />
        {images.length > 0 && <Button loadMore={this.loadMoreButton} />}
        {pending && <Loader />}
        {modal && <Modal image={modal} closeModal={this.closeModal} />}
      </Container>
    );
  }
}

export default App;
