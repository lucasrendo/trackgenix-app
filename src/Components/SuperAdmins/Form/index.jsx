import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetMessage, resetSuperAdmin } from '../../../redux/super admins/actions';
import {
  createSuperAdmins,
  editSuperAdmins,
  getSingleSuperAdmins
} from '../../../redux/super admins/thunks';
import Loading from '../../Shared/Loading/Loading';
import Form from '../../Shared/Form/Form';
import Modal from '../../Shared/Modal/Modal';
import styles from './super-admins.module.css';

function SuperAdminsForm() {
  const { id } = useParams();
  const [inputValues, setInputValues] = useState({});
  const { goBack } = useHistory();
  const [modalMessage, setModalMessage] = useState(false);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.superAdmins.isLoading);
  const message = useSelector((state) => state.superAdmins.message);
  const error = useSelector((state) => state.superAdmins.error);
  const superAdmin = useSelector((state) => state.superAdmins.superAdmin);
  // const resource = '/super-admin';
  useEffect(async () => {
    id && dispatch(getSingleSuperAdmins(id));
    return () => dispatch(resetSuperAdmin);
  }, []);

  // const getSuperAdmin = async () => {
  //   try {
  //     if (id) {
  //       const response = await fetch(`${process.env.REACT_APP_API_URL}${resource}/${id}`);
  //       const body = await response.json();
  //       saveSuperadmins(body.data);
  //     }
  //   } catch (error) {
  //     setModalMessage(error);
  //     setIsAdding(true);
  //   }
  // };

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
      header: 'Is active',
      type: 'checkbox',
      key: 'isActive',
      required: false
    }
  ];

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
    setModalMessage(false);
    dispatch(resetMessage());
    if (!error) {
      goBack();
    }
  };

  // === Handle submit data and method === //
  const submitHandler = (e) => {
    e.preventDefault();
    id ? dispatch(editSuperAdmins(inputValues, id)) : dispatch(createSuperAdmins(inputValues));
    setModalMessage(true);
  };

  return (
    <section className={styles.container}>
      <h2>Super Admins</h2>
      {isLoading ? (
        <Loading />
      ) : (
        <Form
          data={config}
          itemData={superAdmin}
          submitHandler={submitHandler}
          userInput={[inputValues, setInputValues]}
        />
      )}
      <Modal handleClose={() => closeHandler()} isOpen={modalMessage} isConfirmation={false}>
        <h2>{message}</h2>
      </Modal>
    </section>
  );
}

export default SuperAdminsForm;
