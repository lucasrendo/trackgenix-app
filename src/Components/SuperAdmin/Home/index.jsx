import React from 'react';
import { Link } from 'react-router-dom';
import styles from './home.module.css';

function SuperAdminHome() {
  return (
    <section className={styles.container}>
      <h2>
        <p>Welcome</p>
        <p>Super Admin!</p>
      </h2>
    </section>
  );
}

export default SuperAdminHome;
