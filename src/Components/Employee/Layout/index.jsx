import { useParams } from 'react-router-dom';
import Header from 'Components/Shared/Header';
import Footer from 'Components/Shared/Footer';
import Sidebar from 'Components/Shared/Sidebar';
import styles from './layout.module.css';

const EmployeeLayout = ({ children }) => {
  const { id } = useParams();
  const links = [
    `/employee/${id}`,
    `/employee/${id}/projects`,
    `/employee/${id}/profile`,
    `/employee/${id}/workedhours`,
    '#',
    '#'
  ];
  const linkTitles = ['Home', 'My Projects', 'Work Hours', 'User Profile', 'About us', 'Help'];
  const title = 'Employee';
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.mainContainer}>
        <Sidebar links={links} linkTitles={linkTitles} title={title} />
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default EmployeeLayout;
