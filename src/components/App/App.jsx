import React, { Component } from 'react';
import Searchbar from '../Searchbar/Searchbar';
import Modal from '../Modal/Modal';
import Loader from '../Loader/Loader';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from '../Button/Button';
import { searchImage } from 'components/services/servicesApi';
import { Container } from './App.styles';

class App extends Component {
  state = {
    search: '',
    images: [],
    page: 1,
    pending: false,
    modal: '',
    error: '',
    totalImages: 0,
  };

  async componentDidUpdate(_, prevState) {
    const { search, page } = this.state;
    if (search !== prevState.search || page !== prevState.page) {
      try {
        this.setState({ pending: true });
        const { images, totalImages } = await searchImage(search, page);
        if (images.length === 0) {
          this.setState({
            images: 'Were sorry, images is not found!',
          });
        }
        this.setState(prevState => ({
          images: [...prevState.images, ...images],
          error: '',
          totalImages,
        }));
      } catch (error) {
        this.setState({ error: 'Ooops..Something went wrong!' });
      } finally {
        this.setState({ pending: false });
      }
    }
  }

  searchNewImage = async inputValue => {
    this.setState({ search: inputValue, page: 1, images: [] });
  };

  loadMoreButton = async () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };

  showModal = imageId => {
    this.setState({ modal: imageId });
  };

  closeModal = () => {
    this.setState({ modal: '' });
  };

  render() {
    const { images, pending, modal, totalImages } = this.state;
    return (
      <Container>
        <Searchbar onSubmit={this.searchNewImage} />
        <ImageGallery images={images} showModal={this.showModal} />
        {images.length !== totalImages && !pending && (
          <Button loadMore={this.loadMoreButton} />
        )}
        {pending && <Loader />}
        {modal && <Modal image={modal} closeModal={this.closeModal} />}
      </Container>
    );
  }
}

export default App;
