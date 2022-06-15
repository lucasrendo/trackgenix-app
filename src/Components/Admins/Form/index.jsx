import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './admins.module.css';
import Form from '../../Shared/Form/Form';
import { addAdmin, updateAdmin, getSingleAdmin, getAdmins } from '../../../redux/admins/thunks';
import Modal from '../../Shared/Modal/Modal';

const Admins = () => {
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admins.admin);
  const pending = useSelector((state) => state.admins.pending);
  const error = useSelector((state) => state.admins.error);
  const { id } = useParams();
  const { goBack } = useHistory();
  // const [admin, setAdmin] = useState();
  const [inputValues, setInputValues] = useState({});
  const [isAdding, setIsAdding] = useState(false);
  // const [error, setError] = useState(true);
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
    getAdmins();
  }, []);

  const getAdmin = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admins`);
      const jsonResponse = await response.json();
      return jsonResponse.data;
    } catch (error) {
      setIsAdding(true);
    }
  };

  // === Fetch functions === key
  // const createInstance = async (obj) => {
  //   try {
  //     const res = await fetch(`${process.env.REACT_APP_API_URL}${resource}`, {
  //       method: 'POST',
  //       headers: { 'content-type': 'application/json' },
  //       body: JSON.stringify(obj)
  //     });
  //     const body = await res.json();
  //     return { message: body.message, err: body.error };
  //   } catch (error) {
  //     setModalMessage(error);
  //     setIsAdding(true);
  //   }
  // };

  // const updateInstance = async (obj) => {
  //   try {
  //     const res = await fetch(`${process.env.REACT_APP_API_URL}${resource}/${id}`, {
  //       method: 'PUT',
  //       headers: { 'content-type': 'application/json' },
  //       body: JSON.stringify(obj)
  //     });
  //     const body = await res.json();
  //     return { message: body.message, err: body.error };
  //   } catch (error) {
  //     setModalMessage(error);
  //     setIsAdding(true);
  //   }
  // };
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
    if (id) {
      dispatch(updateAdmin(inputValues, id));
    } else {
      dispatch(addAdmin(inputValues));
    }
    setModalMessage('Success');
    setIsAdding(true);
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
