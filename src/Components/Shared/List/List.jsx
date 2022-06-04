import React from 'react';
import styles from './list.module.css';

const List = ({ data, headers }) => {
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
                  <button>&#9998;</button>
                </td>
                <td className={styles.td}>
                  <button>X</button>
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
