import styles from './home.module.css';
import React from 'react';
import { useSelector } from 'react-redux';

function Home() {
  const employee = useSelector((state) => state.employees.employee);
  return (
    <section className={styles.container}>
      <h2>
        Welcome Jorge Pérez
        {/*{employee.firstName}&nbsp;
        {employee.lastName}*/}
      </h2>
      <div className={styles.image}>
        <img src="../../../public/home-img.png" />
      </div>
    </section>
  );
}

export default Home;
