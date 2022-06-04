import react, { useState, useEffect } from 'react';
import style from './styles.module.css';

/*
titles is an array of the labels text: ['employees','projects', 'date', 'name', ...]
template is an empty object with all the necessary keys with data type defined but empty: {name: '', lastName: '', date: 'date', checked: false}
objKeys: receives the keys of the template object and makes an array with it, only the keys, no values, the keys are the values of the array
*/

const Form = ({ formMethod, titles, template, match }) => {
  const objKeys = Object.keys(template);
  const [lists, setLists] = useState({});

  const setInputType = (value) => {
    if (typeof value === 'boolean') return 'checkbox';
    if (value === 'date') return 'date';
    if (typeof value === 'string') return 'text';
  };

  useEffect(() => {
    objKeys.forEach(async (key, index) => {
      if (typeof template[key] === 'object') {
        await fetchObjects(titles[index].toLowerCase());
      }
    });
    return setLists({});
  }, []);

  // ===== FETCH DATA ===== //

  const fetchObjects = async (resource) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/${resource}s`);
      const body = await res.json();
      // eslint-disable-next-line prettier/prettier
      setLists(lists[resource] = body.data);
      console.log('lists object');
      console.log(lists);
    } catch (error) {
      alert(error);
    }
  };

  // const getInstance = async () => {
  //   try {
  //     const res = await fetch(`${process.env.REACT_APP_API_URL}${match.path}`);
  //     const body = await res.json();
  //     return body.data;
  //   } catch (error) {
  //     alert(error);
  //   }
  // };

  // const createTask = async (task) => {
  //   try {
  //     const res = await fetch(`${process.env.REACT_APP_API_URL}/tasks`, {
  //       method: 'POST',
  //       headers: { 'content-type': 'application/json' },
  //       body: JSON.stringify(task)
  //     });
  //     const body = await res.json();
  //     alert(`${body.message}`);
  //     setStatus(body.error);
  //     setTask(body.data);
  //     return body;
  //   } catch (error) {
  //     alert(error);
  //   }
  // };

  // const updateTask = async (task) => {
  //   try {
  //     const res = await fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`, {
  //       method: 'PUT',
  //       headers: { 'content-type': 'application/json' },
  //       body: JSON.stringify(task)
  //     });
  //     const body = await res.json();
  //     alert(body.message);
  //     setStatus(body.error);
  //   } catch (error) {
  //     alert(error);
  //   }
  // };

  // const submitHandler = async (e) => {
  //   e.preventDefault();

  //   if (formMethod === 'PUT') {
  //     await updateTask({
  //       employeeId: employeeId,
  //       projectId: projectId,
  //       title: title,
  //       description: description,
  //       date: date,
  //       done: done
  //     });
  //   }
  //   if (formMethod === 'POST') {
  //     if (projectId === '' || title === '') return alert('title and project are required');
  //     await createTask({
  //       employeeId: employeeId,
  //       projectId: projectId,
  //       title: title,
  //       description: description,
  //       date: date,
  //       done: done
  //     });
  //   }
  // };

  return (
    <form className={style.form}>
      {titles.map((title, index) => {
        return (
          <div
            key={index}
            className={
              setInputType(template[objKeys[index]]) === 'checkbox'
                ? style.check
                : style.inputContainer
            }
          >
            {setInputType(template[objKeys[index]]) !== 'checkbox' && (
              <label htmlFor={objKeys[index]}>{title}</label>
            )}
            {typeof template[objKeys[index]] === 'object' ? (
              <select id={objKeys[index]} value="">
                <option value="" disabled>{`select ${title}`}</option>
                {/* {lists[title.toLowerCase()].map((item) => (
                  <option key={item._id} value={item._id}>
                  {item._id}
                  </option>
                ))} */}
                {console.log(lists)}
              </select>
            ) : (
              <input type={setInputType(template[objKeys[index]])} id={objKeys[index]} />
            )}
            {setInputType(template[objKeys[index]]) === 'checkbox' && (
              <label htmlFor={objKeys[index]}>{title}</label>
            )}
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
