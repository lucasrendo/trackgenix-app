import styles from './time-sheets.module.css';

function TimeSheets() {
  return (
    <section className={styles.container}>
      <h2>TimeSheets</h2>
      <button>
        <a href="/time-sheets/form">Add new Timesheet</a>
      </button>
    </section>
  );
}

export default TimeSheets;
