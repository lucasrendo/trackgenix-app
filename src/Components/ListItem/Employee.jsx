import React from 'react';
import styles from './employee.module.css';

const Employee = ({ listItem, deleteItem, setShowModal }) => {
  const onClick = () => {
    const options = {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      }
    };
    const url = `${process.env.REACT_APP_API_URL}/employees/${listItem._id}`;
    fetch(url, options).then((response) => {
      if (response.status !== 200) {
        return response.json().then(({ message }) => {
          throw new Error(message);
        });
      }
      setShowModal(true);
      return deleteItem(listItem._id);
    });
  };

  return (
    <tr className={styles.rows}>
      <td>{listItem.firstName}</td>
      <td>{listItem.lastName}</td>
      <td>{listItem.email}</td>
      <td>{listItem.isActive.toString()}</td>
      <td>
        <button className={styles.button}>
          <a href={`/employees/form?id=${listItem._id}`}>Edit</a>
        </button>
      </td>
      <td>
        <button className={styles.buttonDelete} onClick={onClick}>
          X
        </button>
      </td>
    </tr>
  );
};

export default Employee;
