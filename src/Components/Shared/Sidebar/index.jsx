import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toggleSidebar } from 'redux/global/actions';
import styles from './sidebar.module.css';

const Sidebar = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [links, setLinks] = useState([]);
  const [title, setTitle] = useState('');
  const employeeLinks = [
    { link: `/employee`, title: 'Home' },
    { link: `/employee/projects`, title: 'My Projects' },
    { link: `/employee/profile`, title: 'User Profile' },
    { link: `/employee/workedhours`, title: 'Work Hours' },
    { link: '#', title: 'Help' }
  ];
  const adminLinks = [
    { link: `/admin`, title: 'Home' },
    { link: `/admin/projects`, title: 'All Projects' },
    { link: `/admin/projects/add`, title: 'Create Project' },
    { link: `/admin/employees`, title: 'Employees' },
    { link: `/admin/report`, title: 'Report' },
    { link: '#', title: 'Help' }
  ];

  const setSidebarValues = () => {
    if (history.location.pathname.includes('/employee')) {
      setTitle('Employee');
      setLinks(employeeLinks);
    } else if (history.location.pathname.includes('/admin')) {
      setTitle('Admin');
      setLinks(adminLinks);
    } else {
      dispatch(toggleSidebar(false));
    }
  };

  useEffect(() => {
    setSidebarValues();
  }, [history.location.pathname]);

  return (
    <aside className={styles.aside}>
      <p>{title}</p>
      <nav>
        <ul className={styles.navList}>
          {links.map((link, index) => {
            return (
              <Link to={link} key={index}>
                <li>{title}</li>
              </Link>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
