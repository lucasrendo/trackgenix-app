import React from 'react';
import ListItem from '../ListItem/ListItem';

const List = ({ list, deleteItem, data }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th id="id">ID</th>
            <th id="employee">Employee</th>
            <th id="project">Project</th>
            <th id="title">Title</th>
            <th id="description">Description</th>
            <th id="date">Date</th>
            <th id="done">Done</th>
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
