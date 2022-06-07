import React from 'react';
import ListItem from '../ListItem/listItem';

const List = ({ list, deleteItem, data }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Project</th>
            <th>Start Date</th>
            <th>Active</th>
            <th>Client</th>
            <th>Delete</th>
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
