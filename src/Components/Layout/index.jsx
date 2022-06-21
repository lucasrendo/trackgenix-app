import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Header from 'Components/Shared/Header';
import Footer from 'Components/Shared/Footer';
import Sidebar from 'Components/Shared/Sidebar';
import styles from './layout.module.css';

const Layout = ({ children }) => {
  const { id } = useParams();
  const history = useHistory();
  const [links, setLinks] = useState([]);
  const [title, setTitle] = useState('');
  const homeLinks = [
    { link: '/', title: 'Homepage' },
    { link: '#', title: 'What is Trackgenix?' },
    { link: '#', title: 'Why choose Trackgenix?' },
    { link: '#', title: 'About us' },
    { link: '#', title: 'Get in touch' },
    { link: '#', title: 'Log in' }
  ];
  const employeeLinks = [
    { link: `/employee/${id}`, title: 'Home' },
    { link: `/employee/projects/${id}`, title: 'My Projects' },
    { link: `/employee/profile/${id}`, title: 'User Profile' },
    { link: `/employee/workedhours/${id}`, title: 'Work Hours' },
    { link: '#', title: 'About us' },
    { link: '#', title: 'Help' }
  ];

  const setSidebarValues = () => {
    if (history.location.pathname.includes('/employee')) {
      setTitle('Employee');
      setLinks(employeeLinks);
    } else {
      setTitle('Shorcuts');
      setLinks(homeLinks);
    }
  };

  useEffect(() => {
    setSidebarValues();
  }, [history.location.pathname]);

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.mainContainer}>
        <Sidebar links={links} title={title} />
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
