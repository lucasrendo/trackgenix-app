import Header from '../Shared/Header';
import Footer from '../Shared/Footer';
import Sidebar from '../Shared/Sidebar/index';
import styles from './layout.module.css';

const Layout = ({ children }) => {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.mainContainer}>
        <Sidebar />
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
