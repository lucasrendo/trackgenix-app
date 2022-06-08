import React from 'react';
import styles from './modal.module.css';
import Button from '../Button/Button';

const Modal = ({ children, isOpen, handleClose, isConfirmation, confirmed }) => {
  if (!isOpen) {
    return null;
  }

  if (isConfirmation) {
    return (
      <div className={styles.modalOverlay}>
        <div className={styles.modalWrapper}>
          <Button onClick={handleClose} className={styles.closeButton}>
            X
          </Button>
          <div className={styles.childrenContainer}>{children}</div>
          <div className={styles.buttonwrapper}>
            <Button className={styles.modalButton} onClick={confirmed}>
              Accept
            </Button>
            <Button className={styles.modalButton} onClick={handleClose}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!isConfirmation) {
    return (
      <div className={styles.modalOverlay}>
        <div className={styles.modalWrapper}>
          <button onClick={handleClose} className={styles.closeButton}>
            X
          </button>
          {children}
          <div className={styles.buttonwrapper}>
            <Button className={styles.modalButton} onClick={handleClose}>
              OK
            </Button>
          </div>
        </div>
      </div>
    );
  }
};

export default Modal;
