import ListItem from '../ListItem/SuperAdmin';
import styles from '../List/superadminlist.module.css';

const SuperAdminList = ({ list, deleteItem, data }) => {
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.header}>
            <th id="firstName">First Name</th>
            <th id="lastName">Last Name</th>
            <th id="email">Email</th>
            <th id="isActive">Is Active?</th>
            <th id="delete">Delete</th>
            <th id="edit">Edit</th>
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

export default SuperAdminList;
