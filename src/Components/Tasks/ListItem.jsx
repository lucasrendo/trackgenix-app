import React from "react";

const ListItem = ({listItem, deleteItem}) => {

    const handleDelete = () => {
        deleteItem(listItem.id);
    };

    return (
        <tr className = "rows">
            <td>{listItem.id}</td>
            <td>{listItem.employee}</td>
            <td>{listItem.project}</td>
            <td>{listItem.title}</td>
            <td>{listItem.description}</td>
            <td>{listItem.date}</td>
            <td>{listItem.done}</td>
            <td>
                <button onClick={() => handleDelete(listItem.id)}>X</button>
            </td>
        </tr>
    );
}

export default ListItem;