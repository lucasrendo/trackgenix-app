import styles from './home.module.css';
import React from 'react';
import { useSelector } from 'react-redux';

function Home() {
  const employee = useSelector((state) => state.employees.employee);
  return (
    <section className={styles.container}>
      <h2>
        <p>Welcome,</p>
        <p>Jorge Pérez!</p>
        {/*{employee.firstName}&nbsp;
        {employee.lastName}*/}
      </h2>
    </section>
  );
}

export default Home;
