import React from 'react';
import { Link } from 'react-router-dom';
import styles from './header.module.css';

function Header() {
  return (
    <header>
      <nav className={styles.navbar}>
        <div className={styles.appName}>
          <h1>
            <Link to={'/'}>TRACKGENIX</Link>
          </h1>
        </div>
        <ul className={styles.rutes}>
          <li>
            <Link to={'/admins'}>admins</Link>
          </li>
          <li>
            <Link to={'/super-admins'}>super admins</Link>
          </li>
          <li>
            <Link to={'/employees'}>employees</Link>
          </li>
          <li>
            <Link to={'/projects'}>projects</Link>
          </li>
          <li>
            <Link to={'/timesheets'}>timesheets</Link>
          </li>
          <li>
            <Link to={'/tasks'}>tasks</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
