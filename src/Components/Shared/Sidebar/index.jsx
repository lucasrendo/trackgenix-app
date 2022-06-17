import React from 'react';
import { Link } from 'react-router-dom';
import styles from './sidebar.module.css';

const Sidebar = ({ links, linkTitles, title }) => {
  return (
    <aside className={styles.aside}>
      <nav>
        <span className={styles.shortcuts}>{title}</span>
        <div className={styles.horizontalLine}></div>
        <ul>
          {linkTitles.map((link, index) => {
            return (
              <li key={index}>
                <Link to={links[index]}>{linkTitles[index]}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
