import styles from './sidebar.module.css';

const Sidebar = () => {
  return (
    <aside className={styles.aside}>
      <nav>
        <span className={styles.shortcuts}>Shortcuts</span>
        <div className={styles.verticalLine}></div>
        <ul>
          <li>
            <a href="">Homepage</a>
          </li>
          <li>
            <a href="">What is Trackgenix</a>
          </li>
          <li>
            <a href="">Why choose Trackgenix</a>
          </li>
          <li>
            <a href="">About us</a>
          </li>
          <li>
            <a href="">Get in touch</a>
          </li>
          <li>
            <a href="">Log in</a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
