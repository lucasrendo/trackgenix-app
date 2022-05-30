import React, { useState, useEffect } from 'react';
import TimeSheetList from './Lists/time-sheet-list';
import styles from './time-sheets.module.css';

function TimeSheets() {
  const [timeSheetsList, saveTimeSheets] = useState([]);
  console.log(timeSheetsList);
  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/timesheets`);
      const jsonResponse = await response.json();
      saveTimeSheets(jsonResponse.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const deleteItem = (_id) => {
    saveTimeSheets([...timeSheetsList.filter((timeSheet) => timeSheet._id !== _id)]);
  };

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
