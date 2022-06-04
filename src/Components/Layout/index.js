import Header from '../Shared/Header/Header';
import Footer from '../Shared/Footer/Footer';
import Sidebar from '../Shared/Sidebar/Sidebar';
import styles from './layout.module.css';

const Layout = ({ children }) => {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.sidebarContainer}>
        <Sidebar />
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
