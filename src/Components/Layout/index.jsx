import Header from 'Components/Shared/Header';
import Footer from 'Components/Shared/Footer';
import Sidebar from 'Components/Shared/Sidebar';
import { useSelector } from 'react-redux';
import styles from './layout.module.css';

const Layout = ({ children }) => {
  const showSidebar = useSelector((state) => state.global.showSidebar);

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
