import React from 'react';
import styles from './list.module.css';

const List = ({ data, headers, resource, deleteItem, editItem, method }) => {
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.headerRow}>
            {headers.map((header, index) => {
              return (
                <th key={index} className={styles.th}>
                  {header.header}
                </th>
              );
            })}
            <th className={styles.th}>Edit</th>
            <th className={styles.th}>Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => {
            return (
              <tr key={row.id} className={styles.rows}>
                {headers.map((header, index) => {
                  return (
                    <td key={index} className={styles.td}>
                      {row[header.key]}
                    </td>
                  );
                })}
                <td className={styles.td}>
                  <button _id={row.id} resource={resource} editItem={editItem} method={method}>
                    &#9998;
                  </button>
                </td>
                <td className={styles.td}>
                  <button _id={row.id} resource={resource} deleteItem={deleteItem}>
                    X
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default List;
