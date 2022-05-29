import React from 'react';
import ListItem from '../ListItem/listItem';
import styles from './list.module.css';

const List = ({ list, deleteItem }) => {
  // eslint-disable-next-line no-console
  console.log('lista de projects en list', list);
  return (
    <div className={styles.container}>
      <table>
        <thead>
          <tr>
            <th>Project</th>
            <th>Start Date</th>
            <th>Active</th>
            <th>Client</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item) => (
            <ListItem key={item._id} listItem={item} deleteItem={deleteItem} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default List;
