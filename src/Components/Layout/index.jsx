import Header from 'Components/Shared/Header';
import Footer from 'Components/Shared/Footer';
import Sidebar from 'Components/Shared/Sidebar';
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
  const title = 'Shorcuts';
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
