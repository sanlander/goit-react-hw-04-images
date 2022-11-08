import { Li, Img } from './ImageGalleryItem.modules';
import { Modal } from 'components/Modal/Modal';
import { useState } from 'react';

export const ImageGalleryItem = ({ item }) => {
  const [isModal, setIsModal] = useState(false);

  const openModal = () => setIsModal(true);
  const closeModal = () => setIsModal(false);

  return (
    <Li>
      <Img onClick={openModal} src={item.webformatURL} alt={item.tags} />

      {isModal && (
        <Modal
          urlImg={item.largeImageURL}
          alt={item.tags}
          onClose={closeModal}
        />
      )}
    </Li>
  );
};
