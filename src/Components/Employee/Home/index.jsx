import styles from './home.module.css';
import React from 'react';
import { useSelector } from 'react-redux';

function Home() {
  return (
    <section className={styles.container}>
      <h2 className={styles.h2}>
        <p className={styles.p}>Welcome,</p>
        <p className={styles.p}>Jorge Pérez!</p>
      </h2>
    </section>
  );
}

export default Home;
