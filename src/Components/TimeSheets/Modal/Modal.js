import styles from './Modal.module.style';

const Modal = ({ message, close, show }) => {
  if (!show) {
    return null;
  }

  const handleClose = () => {
    close();
  };
  return (
    <div id="modal" className={styles.modal}>
      <div className={styles.modalHeader}>
        <h3>{message}</h3>
        <span className={styles.close} onClick={handleClose}>
          &times;
        </span>
      </div>
    </div>
  );
};

export default Modal;
