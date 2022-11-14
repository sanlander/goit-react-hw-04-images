import { useEffect } from 'react';
import { OverlayDiv, ModalDiv } from './Modal.modules';

export const Modal = ({ urlImg, alt, onClose }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      e.key === 'Escape' && onClose();
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <OverlayDiv
      onClick={evt => {
        evt.target.nodeName !== 'IMG' && onClose();
      }}
    >
      <ModalDiv>
        <img src={urlImg} alt={alt} />
      </ModalDiv>
    </OverlayDiv>
  );
};
