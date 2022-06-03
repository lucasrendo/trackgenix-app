import styles from './header.module.css';

function Header() {
  return (
    <header>
      <nav className={styles.navbar}>
        <div className={styles.appName}>
          <h1>
            <a href="/">TRACKGENIX</a>
          </h1>
        </div>
        <ul className={styles.rutes}>
          <li>
            <a href="/admins">admins</a>
          </li>
          <li>
            <a href="/super-admins">super admins</a>
          </li>
          <li>
            <a href="/employees">employees</a>
          </li>
          <li>
            <a href="/projects">projects</a>
          </li>
          <li>
            <a href="/time-sheets">timesheets</a>
          </li>
          <li>
            <a href="/tasks">tasks</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
