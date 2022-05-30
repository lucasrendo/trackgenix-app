import styles from './modal.module.css';

const Modal = (props) => {
  if (!props.show) {
    return null;
  }

  const onConfirm = () => {
    props.onCloseModal();
    props.close();
  };

  const onCancel = () => {
    props.close();
  };

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h3>Modal</h3>
        <button className={styles.button} onClick={onConfirm}>
          Accept
        </button>
        <button className={styles.button} onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Modal;
