import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../Shared/Button/Button';

const TimeSheet = ({ listItem, deleteItem, editTimeSheet, setModal, data }) => {
  const handleEditTimeSheet = () => {
    editTimeSheet(listItem._id);
  };
  const handleDeleteItem = () => {
    const options = {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      }
    };
    fetch(`${process.env.REACT_APP_API_URL}/timesheets/${listItem._id}`, options).then(
      (response) => {
        if (response.status !== 200) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        setModal(true);
        return deleteItem(listItem._id);
      }
    );
  };

  return (
    <tr>
      <td>{listItem._id}</td>
      <td>{listItem.employee && listItem.employee.firstName}</td>
      <td>{listItem.employee && listItem.employee.lastName}</td>
      <td>{listItem.project && listItem.project._id}.</td>
      <td>{listItem.role}.</td>
      <td>{listItem.date}</td>
      <td>{listItem.rate}</td>
      <td>{listItem.workedHours}</td>
      <td>{listItem.description}</td>
      <td>{listItem.task && listItem.task.description}.</td>
      <td>
        <Button classes={'red'} onClick={() => handleEditTimeSheet()}>
          <Link
            to={{
              pathname: `timesheets/${listItem._id}`,
              state: {
                from: '/timesheets'
              },
              linkData: data,
              itemData: listItem
            }}
          >
            Edit
          </Link>
        </Button>
      </td>
      <td>
        <Button classes={'close'} onClick={() => handleDeleteItem()}>
          X
        </Button>
      </td>
    </tr>
  );
};

export default TimeSheet;
