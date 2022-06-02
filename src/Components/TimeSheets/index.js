import React, { useState, useEffect } from 'react';
import TimeSheetList from './List/time-sheet-list';
import TimeSheetForm from './Form';
import Modal from './Modal/Modal';
import styles from './time-sheets.module.css';

function TimeSheets() {
  const [timeSheetsList, saveTimeSheets] = useState([]);
  const [showedScreen, setShowedScreen] = useState();
  const [method, setMethod] = useState('POST');
  const [timeSheetId, setTimesheetId] = useState('');
  const [modal, setModal] = useState(false);

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/timesheets`);
      const jsonResponse = await response.json();
      saveTimeSheets(jsonResponse.data);
    } catch (error) {
      // eslint-disable-next-line no-console
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
    const closeModal = () => {
      setModal(false);
    };
  };

  const closeModal = () => {
    setModal(false);
  };

  return (
    <section className={styles.container}>
      <h2>TimeSheets</h2>
      <Modal message={'Time sheet deleted'} show={modal} close={closeModal} />
      {showedScreen ? (
        <TimeSheetForm method={method} setMethod={setMethod} timeSheetId={timeSheetId} />
      ) : (
        <TimeSheetList
          list={timeSheetsList}
          setlist={saveTimeSheets}
          deleteItem={deleteItem}
          editTimeSheet={editTimeSheet}
          setModal={setModal}
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
