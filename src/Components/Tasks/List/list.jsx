import React from 'react';
import ListItem from '../ListItem/ListItem';

const List = ({ list, deleteItem, data }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Employee</th>
            <th>Project</th>
            <th>Title</th>
            <th>Description</th>
            <th>Date</th>
            <th>Done</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item) => (
            <ListItem key={item._id} listItem={item} deleteItem={deleteItem} data={data} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default List;
