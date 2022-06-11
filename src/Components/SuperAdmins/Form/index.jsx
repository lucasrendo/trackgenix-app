import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Form from '../../Shared/Form/Form';
import Modal from '../../Shared/Modal/Modal';
import styles from './super-admins.module.css';

function SuperAdminsForm() {
  const [superadminsList, saveSuperadmins] = useState();
  const { id } = useParams();
  const [inputValues, setInputValues] = useState({});
  const [isAdding, setIsAdding] = useState(false);
  const { goBack } = useHistory();
  const [modalMessage, setModalMessage] = useState('');
  const [error, setError] = useState(true);
  const resource = '/super-admin';
  useEffect(async () => {
    getSuperAdmin();
  }, []);

  const getSuperAdmin = async () => {
    try {
      if (id) {
        const response = await fetch(`${process.env.REACT_APP_API_URL}${resource}/${id}`);
        const body = await response.json();
        saveSuperadmins(body.data);
      }
    } catch (error) {
      setModalMessage(error);
      setIsAdding(true);
    }
  };

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
    if (result && !result.err) setInputValues({});
  };

  return (
    <section className={styles.container}>
      <h2>Super Admins</h2>
      <Form
        data={config}
        itemData={superadminsList}
        submitHandler={submitHandler}
        userInput={[inputValues, setInputValues]}
      />
      <Modal handleClose={() => closeHandler()} isOpen={isAdding} isConfirmation={false}>
        <h2>{modalMessage}</h2>
      </Modal>
    </section>
  );
}

export default SuperAdminsForm;
