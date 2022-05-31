import React, { useEffect, useState } from 'react';
import TimeSheetList from './List/time-sheet-list';
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
      <TimeSheetList list={timeSheetsList} setlist={saveTimeSheets} deleteItem={deleteItem} />
    </section>
  );
}

export default TimeSheets;
