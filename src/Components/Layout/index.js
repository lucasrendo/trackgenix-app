import Header from '../Shared/Header/Header';
import Footer from '../Shared/Footer/Footer';
import styles from './layout.module.css';
import Form from '../Shared/Form/Form';

const Layout = ({ children }) => {
  const mockObject = {
    employeeId: {},
    projectId: {},
    title: '',
    description: '',
    date: 'date',
    done: false
  };
  const mockTitles = ['Employee', 'Project', 'Title', 'Description', 'Date', 'Done'];

  return (
    <div className={styles.container}>
      <Header />
      {children}
      <Form template={mockObject} titles={mockTitles} />
      <Footer />
    </div>
  );
};

export default Layout;
