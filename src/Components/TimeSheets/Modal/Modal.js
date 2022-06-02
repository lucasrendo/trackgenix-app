import styles from './Modal.module.css';

const Modal = (props) => {
  if (!props.show) {
    return null;
  }

  const handleClose = () => {
    props.close();
  };
  return (
    <div id="modal" className={styles.modal}>
      <div className={styles.header}>
        <h3>Trackgenix</h3>
        <span className={styles.close} onClick={handleClose}>
          &times;
        </span>
      </div>
      <p>{props.message}</p>
    </div>
  );
};

export default Modal;
