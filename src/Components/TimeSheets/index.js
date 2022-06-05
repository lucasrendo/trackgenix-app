import React, { useState, useEffect } from 'react';
import TimeSheetList from './List/time-sheet-list';
import Form from '../Shared/Form/Form';
import Modal from './Modal/Modal';
import styles from './time-sheets.module.css';

const TimeSheets = (props) => {
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

  const projects = [
    {
      id: '6289110ececee60c913cb4fa',
      text: 'Acme'
    },
    {
      id: '6298e1de30e0bd6de799e19e',
      text: 'CryptoWorld'
    }
  ];

  const employees = [
    {
      id: '6287e6f01c1709ee93503342',
      text: 'Lucas Rendo'
    },
    {
      id: '6288f73964ed6961bb7c2075',
      text: 'Nicolas Micheletti'
    }
  ];

  const tasks = [
    {
      id: '6296377916724c71ace949ef',
      text: 'Create Form Component'
    },
    {
      id: '62965b5916724c71ace94ad7',
      text: 'Create list Component'
    }
  ];

  const data = [
    {
      title: 'Employee',
      type: 'select',
      id: 'employee',
      options: employees,
      required: true
    },
    {
      title: 'Project',
      type: 'select',
      id: 'project',
      options: projects,
      required: true
    },
    {
      title: 'Role',
      type: 'text',
      id: 'role',
      required: true
    },
    {
      title: 'Date',
      type: 'date',
      id: 'date',
      required: true
    },
    {
      title: 'Rate',
      type: 'number',
      id: 'rate',
      required: true
    },
    {
      title: 'Worked Hours',
      type: 'number',
      id: 'workedHours',
      required: true
    },
    {
      title: 'Description',
      type: 'text',
      id: 'description'
    },
    {
      title: 'Tasks',
      type: 'select',
      id: 'task',
      options: tasks
    }
  ];

  return (
    <section className={styles.container}>
      <h2>TimeSheets</h2>
      <Modal message={'Time sheet deleted'} show={modal} close={closeModal} />
      {showedScreen ? (
        <Form data={data} props={props} />
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

  // return (
  //   <section className={styles.container}>
  //     <h2>TimeSheets</h2>
  //     <Router>
  //       <Route exact path="/time-sheets/add" render />
  //     </Router>
  //     <div>
  //       <button onClick={() => props.history.push('/time-sheets')}>Timesheet list</button>
  //       <button onClick={() => props.history.push('/time-sheets/add')}>Add new Timesheet</button>
  //     </div>
  //   </section>
  // );
};

export default TimeSheets;
