import React from 'react';
import styles from './modal.module.css';
<<<<<<< HEAD
import Button from '../Button/Button';
=======
>>>>>>> aa481c645d38869e93532789a9461170912926fd

const Modal = ({ children, isOpen, handleClose, isConfirmation, confirmed }) => {
  if (!isOpen) {
    return null;
  }

  if (isConfirmation) {
    return (
      <div className={styles.modalOverlay}>
        <div className={styles.modalWrapper}>
          <button onClick={handleClose} className={styles.closeButton}>
            X
          </button>
          <div className={styles.childrenContainer}>{children}</div>
          <div className={styles.buttonwrapper}>
            <button className={styles.modalButton} onClick={confirmed}>
              Accept
            </button>
            <button className={styles.modalButton} onClick={handleClose}>
              Cancel
            </button>
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
            <button className={styles.modalButton} onClick={handleClose}>
              OK
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default Modal;
