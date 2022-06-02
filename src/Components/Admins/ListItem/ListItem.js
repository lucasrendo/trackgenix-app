import React from 'react';

const ListAdmin = ({ listItem, deleteAdmin, editAdmin }) => {
  const handleEditAdmin = () => {
    editAdmin(listItem._id);
  };
  const handleDelete = () => {
    const deleteMethod = {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      }
    };
    fetch(`${process.env.REACT_APP_API_URL}/admins/${listItem._id}`, deleteMethod).then(
      (response) => {
        if (response.status !== 200) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return deleteAdmin(listItem._id);
      }
    );
  };

  return (
    <tr className="rows">
      <td>{listItem._id}</td>
      <td>{listItem.firstName}</td>
      <td>{listItem.lastName}</td>
      <td>{listItem.email}</td>
      <td>{listItem.password}</td>
      <td>{listItem.isActive.toString()}</td>
      <td>
        <button onClick={handleEditAdmin}>Edit</button>
      </td>
      <td>
        <button onClick={() => handleDelete(listItem._id)}>X</button>
      </td>
    </tr>
  );
};

export default ListAdmin;
