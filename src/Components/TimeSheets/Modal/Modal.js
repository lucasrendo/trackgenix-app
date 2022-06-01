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
        <p>{props.message}</p>
        <span className={styles.close} onClick={handleClose}>
          &times;
        </span>
      </div>
    </div>
  );
};

export default Modal;
