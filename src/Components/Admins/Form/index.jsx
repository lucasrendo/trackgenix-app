import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styles from './admins.module.css';
import Form from '../../Shared/Form/Form';
import Modal from '../../Shared/Modal/Modal';

const Admins = () => {
  const { id } = useParams();
  const { goBack } = useHistory();
  const [admin, setAdmin] = useState();
  const [inputValues, setInputValues] = useState({});
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState(true);
  const [modalMessage, setModalMessage] = useState('');
  const resource = '/admins';
  const config = [
    {
      header: 'First Name',
      type: 'text',
      key: 'firstName',
      required: true
    },
    {
      header: 'Last Name',
      type: 'text',
      key: 'lastName',
      required: true
    },
    {
      header: 'Email',
      type: 'email',
      key: 'email',
      required: true
    },
    {
      header: 'Password',
      type: 'password',
      key: 'password',
      required: true
    },
    {
      header: 'Is Active?',
      type: 'checkbox',
      key: 'isActive',
      required: false
    }
  ];

  useEffect(() => {
    getAdmin();
  }, []);

  const getAdmin = async () => {
    try {
      if (id) {
        const response = await fetch(`${process.env.REACT_APP_API_URL}${resource}/${id}`);
        const body = await response.json();
        setAdmin(body.data);
      }
    } catch (error) {
      setModalMessage(error);
      setIsAdding(true);
    }
  };

  // === Fetch functions === key
  const createInstance = async (obj) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}${resource}`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(obj)
      });
      const body = await res.json();
      return { message: body.message, err: body.error };
    } catch (error) {
      setModalMessage(error);
      setIsAdding(true);
    }
  };

  const updateInstance = async (obj) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}${resource}/${id}`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(obj)
      });
      const body = await res.json();
      return { message: body.message, err: body.error };
    } catch (error) {
      setModalMessage(error);
      setIsAdding(true);
    }
  };
  const closeHandler = () => {
    if (error) setIsAdding(false);
    else {
      setIsAdding(false);
      goBack();
    }
  };

  // === Handle submit data and method === //
  const submitHandler = async (e) => {
    e.preventDefault();
    let result;
    if (id) {
      result = await updateInstance(inputValues);
    } else {
      result = await createInstance(inputValues);
    }
    setError(result.err);
    setModalMessage(result.message);
    setIsAdding(true);
    if (result && !result.err) {
      setInputValues({});
      setModalMessage(result.message);
      setIsAdding(true);
    }
  };

  return (
    <section className={styles.container}>
      <h2>Admins</h2>
      <Form
        data={config}
        itemData={admin}
        submitHandler={submitHandler}
        userInput={[inputValues, setInputValues]}
      />
      <Modal handleClose={() => closeHandler()} isOpen={isAdding} isConfirmation={false}>
        <h2>{modalMessage}</h2>
      </Modal>
    </section>
  );
};

export default Admins;
