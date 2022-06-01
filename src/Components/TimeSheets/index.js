import React, { useEffect, useState } from 'react';
import TimeSheetList from './List/time-sheet-list';
import Modal from './Modal/Modal';
import styles from './time-sheets.module.css';

function TimeSheets() {
  const [timeSheetsList, saveTimeSheets] = useState([]);
  const [modal, setModal] = useState(false);

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

  const closeModal = () => {
    setModal(false);
  };

  return (
    <section className={styles.container}>
      <h2>TimeSheets</h2>
      <Modal message={'Time sheet deleted'} show={modal} close={closeModal} />
      <TimeSheetList
        list={timeSheetsList}
        setlist={saveTimeSheets}
        deleteItem={deleteItem}
        setModal={setModal}
      />
    </section>
  );
}

export default TimeSheets;
