import React, { useState, useEffect } from 'react';
import TimeSheetList from './List/time-sheet-list';
import TimeSheetForm from './Form';
import styles from './time-sheets.module.css';

function TimeSheets() {
  const [timeSheetsList, saveTimeSheets] = useState([]);
  const [showedScreen, setShowedScreen] = useState(false);
  const [method, setMethod] = useState('POST');
  const [timeSheetId, setTimesheetId] = useState('');
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

  const editTimeSheet = (id) => {
    setMethod('PUT');
    setShowedScreen(true);
    setTimesheetId(id);
  };

  return (
    <section className={styles.container}>
      <h2>TimeSheets</h2>
      {showedScreen ? (
        <TimeSheetForm method={method} setMethod={setMethod} timeSheetId={timeSheetId} />
      ) : (
        <TimeSheetList
          list={timeSheetsList}
          setlist={saveTimeSheets}
          deleteItem={deleteItem}
          editTimeSheet={editTimeSheet}
        />
      )}
      <div>
        <button onClick={() => setShowedScreen(false)}>Timesheet list</button>
        <button onClick={() => setShowedScreen(true)}>Add new Timesheet</button>
      </div>
    </section>
  );
}

export default TimeSheets;
