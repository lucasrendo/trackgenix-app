import React from 'react';
import { Link } from 'react-router-dom';
import styles from './sidebar.module.css';

const Sidebar = ({ links, title }) => {
  return (
    <aside className={styles.aside}>
      <nav>
        <span className={styles.shortcuts}>{title}</span>
        <div className={styles.horizontalLine}></div>
        <ul>
          {links.map((link, index) => {
            return (
              <li key={index}>
                <Link to={link.link}>{link.title}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
