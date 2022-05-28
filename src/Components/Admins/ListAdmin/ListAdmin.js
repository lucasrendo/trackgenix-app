import React from 'react';

const ListAdmin = ({ listItem, deleteAdmin }) => {
  const handleDelete = () => {
    deleteAdmin(listItem._id);
  };

  return (
    <tr className="rows">
      <td>{listItem._id}</td>
      <td>{listItem.firstName}</td>
      <td>{listItem.lastName}</td>
      <td>{listItem.email}</td>
      <td>{listItem.phone}</td>
      <td>
        <button onClick={() => handleDelete(listItem._id)}>X</button>
      </td>
    </tr>
  );
};

export default ListAdmin;
