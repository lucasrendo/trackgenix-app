import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from 'Components/Shared/Header';
import Footer from 'Components/Shared/Footer';
import Sidebar from 'Components/Shared/Sidebar';
import styles from './layout.module.css';

const EmployeeLayout = ({ children }) => {
  const id = '62b1122165165c996de858ec';
  const [links, setLinks] = useState([]);
  const [linkTitles, setLinksTitles] = useState([]);
  const [title, setTitle] = useState('');
  const employeeLinks = [
    `/employee/${id}`,
    `/employee/projects/${id}`,
    `/employee/profile/${id}`,
    `/employee/workedhours/${id}`,
    '#',
    '#'
  ];
  const employeeLinkTitles = [
    'Home',
    'My Projects',
    'User Profile',
    'Work Hours',
    'About us',
    'Help'
  ];
  const employeeTitle = 'Employee';

  useEffect(() => {
    setLinks(employeeLinks);
    setLinksTitles(employeeLinkTitles);
    setTitle(employeeTitle);
  }, []);

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
