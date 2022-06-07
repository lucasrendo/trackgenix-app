import React from 'react';

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
    <tr>
      <td>{listItem.firstName}</td>
      <td>{listItem.lastName}</td>
      <td>{listItem.email}</td>
      <td>{listItem.isActive.toString()}</td>
      <td>
        <button>
          <a href={`/employees/form?id=${listItem._id}`}>Edit</a>
        </button>
      </td>
      <td>
        <button onClick={onClick}>X</button>
      </td>
    </tr>
  );
};

export default Employee;
