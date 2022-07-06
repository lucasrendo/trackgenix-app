import { useEffect } from 'react';
import { useLocation, useRouteMatch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleSidebar } from 'redux/global/actions';
import Header from 'Components/Shared/Header';
import Footer from 'Components/Shared/Footer';
import Sidebar from 'Components/Shared/Sidebar';
import styles from './layout.module.css';

const Layout = ({ children }) => {
  const showSidebar = useSelector((state) => state.global.showSidebar);
  const location = useLocation();
  const employeeRoutes = useRouteMatch('/employee');
  const adminRoutes = useRouteMatch('/admin');
  const dispatch = useDispatch();

  const sidebarToggler = () => {
    if (employeeRoutes || adminRoutes) dispatch(toggleSidebar(true));
    else dispatch(toggleSidebar(false));
  };

  useEffect(() => sidebarToggler(), [location.pathname]);

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.mainContainer}>
        {showSidebar && <Sidebar />}
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
