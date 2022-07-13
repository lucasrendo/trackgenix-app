import { useState, useEffect } from 'react';
import { Link, useRouteMatch, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'Components/Shared/Button';
import menu from 'assets/icons/menu-icon.png';
import logo from 'assets/icons/app-logo.png';
import { toggleSidebar } from 'redux/global/actions';
import styles from './header.module.css';

function Header() {
  const location = useLocation();
  const dispatch = useDispatch();
  const showSidebar = useSelector((state) => state.global.showSidebar);
  const [showMenu, setShowMenu] = useState(false);
  const employeeRoutes = useRouteMatch('/employee');
  const adminRoutes = useRouteMatch('/admin');

  const displayMenuButton = () => {
    if (employeeRoutes || adminRoutes) setShowMenu(true);
    else setShowMenu(false);
  };

  useEffect(() => displayMenuButton(), [location.pathname]);

  return (
    <header className={styles.container}>
      {showMenu ? (
        <img
          src={menu}
          alt="menu toggler"
          className={styles.menu}
          onClick={() => dispatch(toggleSidebar(!showSidebar))}
        />
      ) : (
        //to keep logo centered on the header
        <div></div>
      )}
      <Link to="/">
        <img src={logo} alt="Page logo" className={styles.logo} />
      </Link>
      <Link to="/login">
        <Button>Log In</Button>
      </Link>
    </header>
  );
}

export default Header;
