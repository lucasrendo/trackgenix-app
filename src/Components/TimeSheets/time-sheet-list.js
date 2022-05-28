import React from 'react';
import TimeSheet from './time-sheet';

const TimeSheetList = ({ list, deleteItem }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Employee ID</th>
            <th>Employee name</th>
            <th>Employee role</th>
            <th>Hours in project</th>
            <th>Project Name</th>
            <th>Task description</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item) => (
            <TimeSheet key={item._id} listItem={item} deleteItem={deleteItem} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TimeSheetList;
