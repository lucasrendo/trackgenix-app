import Header from '../Shared/Header/Header';
import Footer from '../Shared/Footer/Footer';
import styles from './layout.module.css';

const Layout = ({ children }) => {
  return (
    <div className={styles.container}>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
