import React from 'react';
import { Link } from 'react-router-dom';
import styles from './sidebar.module.css';

const Sidebar = () => {
  return (
    <aside className={styles.aside}>
      <nav>
        <span className={styles.shortcuts}>Shortcuts</span>
        <div className={styles.verticalLine}></div>
        <ul>
          <li>
            <Link to={'/'}>Homepage</Link>
          </li>
          <li>
            <Link to={'#'}>What is Trackgenix</Link>
          </li>
          <li>
            <Link to={'#'}>Why choose Trackgenix</Link>
          </li>
          <li>
            <Link to={'#'}>About us</Link>
          </li>
          <li>
            <Link to={'#'}>Get in touch</Link>
          </li>
          <li>
            <Link to={'#'}>Log in</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
