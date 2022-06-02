import styles from './modal.module.css';

const Modal = (props) => {
  if (!props.show) {
    return null;
  }

  const onConfirm = () => {
    props.close();
  };

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h3>{props.title}</h3>
        <button className={styles.button} onClick={onConfirm}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
