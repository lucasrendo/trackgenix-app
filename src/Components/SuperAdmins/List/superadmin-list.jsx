import ListItem from '../ListItem/SuperAdmin';
import styles from './superadminlist.module.css';
// import List from '../Shared/List/List';

const SuperAdminList = ({ list, deleteItem, data }) => {
  // const formatListData = (responseData) => {
  //   const data = responseData.map((superAdmins) => {
  //     return {
  //       firstName: superAdmins.firstName,
  //       lastName: superAdmins.lastName,
  //       email: superAdmins.email,
  //       isActive: superAdmins.isActive.toString()
  //     };
  //   });
  //   return data;
  // };
  // const headers = [
  //   { header: 'First Name', key: 'firstName' },
  //   { header: 'Last Name', key: 'lastName' },
  //   { header: 'email', key: 'email' },
  //   { header: 'Is Active?', key: 'isActive' }
  // ];
  // const resource = 'super-admins';
  //
  //
  //
  //
  //
  //
  //
  //
  //   return (
  //     <div className={styles.container}>
  //       <table className={styles.table}>
  //         <thead>
  //           <tr className={styles.header}>
  //             <th id="firstName">First Name</th>
  //             <th id="lastName">Last Name</th>
  //             <th id="email">Email</th>
  //             <th id="isActive">Is Active?</th>
  //             <th id="delete">Delete</th>
  //             <th id="edit">Edit</th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {list.map((item) => (
  //             <ListItem key={item._id} listItem={item} deleteItem={deleteItem} data={data} />
  //           ))}
  //         </tbody>
  //       </table>
  //     </div>
  //   );
};

export default SuperAdminList;
