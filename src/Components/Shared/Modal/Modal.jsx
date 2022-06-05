import React from 'react';
import styles from './modal.module.css';

const Modal = ({ children, isOpen, handleClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalWrapper}>
        <button onClick={handleClose} className={styles.closeButton}>
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
