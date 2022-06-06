import { useState, useEffect } from 'react';
import style from './styles.module.css';
import { useLocation, useParams, useHistory, withRouter } from 'react-router-dom';

const Form = ({ data }) => {
  const { state, linkData, itemData, pathname } = useLocation();
  const { id } = useParams();
  const { goBack } = useHistory();
  const [inputValues, setInputValues] = useState({});
  const [config, setConfig] = useState([]);

  // === Create instance state on mount === //
  useEffect(() => {
    if (data) {
      setConfig(data);
      let template = {};

      data.forEach((item) => {
        if (item.type === 'checkbox') template[item.id] = false;
        else template[item.id] = '';
      });
      setInputValues(template);
    } else if (linkData) {
      let formattedItem = {};
      setConfig(linkData);

      linkData.forEach((item) => {
        if (itemData[item.id] && typeof itemData[item.id] === 'object') {
          formattedItem[item.id] = itemData[item.id]._id;
        } else if (item.type === 'date') {
          formattedItem[item.id] = itemData[item.id].substring(0, 10);
        } else formattedItem[item.id] = itemData[item.id];
      });
      setInputValues(formattedItem);
    }
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
      const res = await fetch(`${process.env.REACT_APP_API_URL}${pathname}`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(obj)
      });
      const body = await res.json();
      return { message: body.message, err: body.error };
    } catch (error) {
      alert(error);
    }
  };

  const updateInstance = async (obj) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}${state.from}/${id}`, {
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

    if (result && result.error === false) setInputValues({});
    alert(result.message);

    if (id) goBack();
  };

  return (
    <form className={style.form} onSubmit={submitHandler}>
      {config.map((item) => {
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
        <button className={`${style.btn} ${style.redBtn}`}>Back</button>
        <button className={style.btn}>Save</button>
      </div>
    </form>
  );
};

export default withRouter(Form);
