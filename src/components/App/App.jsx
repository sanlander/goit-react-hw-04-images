import { useState, useEffect } from 'react';
import { AppBox } from './App.modules';
import { Searchbar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { ProgressBar } from 'react-loader-spinner';
import { getImages, MAX_PAGE } from 'services/pixabay-api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  const [images, setImages] = useState([]);
  const [textSearch, setTextSearch] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(false);

  useEffect(() => {
    if (textSearch === '') return;

    setIsLoading(true);

    getImages(textSearch, page).then(r => {
      try {
        if (r.length === 0) {
          toast.error('No search images!', { autoClose: 2000 });
          setTextSearch('');
          return;
        }

        setImages(prevImg => [...prevImg, ...r]);
        setIsLoadMore(true);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
        if (MAX_PAGE === page || MAX_PAGE === 0) setIsLoadMore(false);
      }
    });
  }, [textSearch, page]);

  const handleSubmitForm = ({ textSearch }) => {
    setImages([]);
    setTextSearch(textSearch);

    setPage(1);
  };

  const handleClickLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <AppBox>
      <Searchbar onSubmit={handleSubmitForm} />
      <ImageGallery images={images} />

      {isLoading && <ProgressBar wrapperStyle={{ margin: '0 auto' }} />}

      {isLoadMore && <Button onClick={handleClickLoadMore} />}
      <ToastContainer />
    </AppBox>
  );
};
