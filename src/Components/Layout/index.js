import Header from '../Header/index';
import Footer from '../Footer/index';
import styles from './layout.module.css';

const Layout = ({ currentScreen }) => {
  return (
    <div className={styles.container}>
      <Header />
      {currentScreen}
      <Footer />
    </div>
  );
};

export default Layout;
