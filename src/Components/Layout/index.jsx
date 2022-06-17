import Header from '../Shared/Header';
import Footer from '../Shared/Footer';
import Sidebar from '../Shared/Sidebar/index';
import styles from './layout.module.css';

const Layout = ({ children }) => {
  const links = ['/', '#', '#', '#', '#', '#'];
  const linkTitles = [
    'Homepage',
    'What is Trackgenix?',
    'Why choose Trackgenix?',
    'About us',
    'Get in touch',
    'Log in'
  ];
  const title = 'Shortcuts';
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.mainContainer}>
        <Sidebar links={links} linkTitles={linkTitles} title={title} />
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
