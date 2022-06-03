import React from 'react';
import TimeSheet from './time-sheet';

const TimeSheetList = ({ list, deleteItem, editTimeSheet, setModal }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Employee Name</th>
            <th>Employee surname</th>
            <th>Project ID</th>
            <th>Employee role</th>
            <th>Date</th>
            <th>Rate</th>
            <th>Worked hours</th>
            <th>description</th>
            <th>Task</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item) => (
            <TimeSheet
              key={item._id}
              listItem={item}
              deleteItem={deleteItem}
              editTimeSheet={editTimeSheet}
              setModal={setModal}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TimeSheetList;
