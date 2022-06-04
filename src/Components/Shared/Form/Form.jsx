import { useState, useEffect } from 'react';
import style from './styles.module.css';
import { useLocation, useParams } from 'react-router-dom';

const Form = ({ data }) => {
  const resource = useLocation();
  const { id } = useParams();
  const [inputValues, setInputValues] = useState({});

  // === Create instance state on mount === //
  useEffect(() => {
    let template = {};
    data.forEach((item) => {
      if (item.type === 'checkbox') template[item.id] = false;
      else template[item.id] = '';
    });
    setInputValues(template);
  }, []);

  // === Handle value change for different input types === //
  const handleChange = (e, input) => {
    if (input.type === 'checkbox')
      setInputValues({ ...inputValues, [input.id]: !inputValues[input.id] });
    else if (input.type === 'date')
      setInputValues({ ...inputValues, [input.id]: e.target.value.substring(0, 10) });
    else setInputValues({ ...inputValues, [input.id]: e.target.value });
  };

  // === Fetch functions === //
  const createInstance = async (obj) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}${resource.pathname}`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(obj)
      });
      const body = await res.json();
      return { msg: body.message, err: body.error };
    } catch (error) {
      alert(error);
    }
  };

  const updateInstance = async (obj) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}${resource.pathname}${id}`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(obj)
      });
      const body = await res.json();
      return { msg: body.message, err: body.error };
    } catch (error) {
      alert(error);
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

    if (result.error === false) setInputValues({});
    alert(result.msg);
  };

  return (
    <form className={style.form} onSubmit={submitHandler}>
      {data.map((item) => {
        return (
          <div
            key={item.id}
            className={item.type === 'checkbox' ? style.check : style.inputContainer}
          >
            {item.type !== 'checkbox' && <label htmlFor={item.id}>{item.title}</label>}
            {item.type === 'select' ? (
              <select
                id={item.id}
                required={item.required && item.required}
                value={inputValues ? inputValues[item.id] : ''}
                onChange={(e) => setInputValues({ ...inputValues, [item.id]: e.target.value })}
              >
                <option selected disabled value="">{`select ${item.title}`}</option>
                {item.options.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.text}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={item.type}
                id={item.id}
                required={item.required && item.required}
                {...(item.type === 'checkbox' && { checked: inputValues[item.id] })}
                value={inputValues ? inputValues[item.id] : item.type === 'checkbox' ? true : ''}
                onChange={(e) => handleChange(e, item)}
              />
            )}
            {item.type === 'checkbox' && <label htmlFor={item.id}>{item.title}</label>}
          </div>
        );
      })}
      <div className={style.btnsContainer}>
        <button className={`${style.btn} ${style.redBtn}`}>Reset</button>
        <button className={style.btn}>Save</button>
      </div>
    </form>
  );
};

export default Form;
