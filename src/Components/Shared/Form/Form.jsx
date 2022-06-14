import { useEffect } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Button from '../Button/Button';
import style from './styles.module.css';

const Form = ({ data, itemData, submitHandler, action }) => {
  const { goBack } = useHistory();
  const dispatch = useDispatch();

  // === Create instance state on mount === //
  useEffect(() => {
    let template = {};
    if (itemData) {
      let formattedItem = {};
      data.forEach((item) => {
        if (itemData[item.key] && typeof itemData[item.key] === 'object')
          formattedItem[item.key] = itemData[item.key]._id;
        else if (itemData[item.key] && item.type === 'date')
          formattedItem[item.key] = itemData[item.key].substring(0, 10);
        else formattedItem[item.key] = itemData[item.key];
      });
      dispatch(action(formattedItem));
    } else {
      data.forEach((item) => {
        if (item.type === 'checkbox') template[item.key] = false;
        else template[item.key] = '';
        dispatch(action(template));
      });
    }
  }, []);

  // === Handle value change for different input types === //
  const handleChange = (e, input) => {
    if (input.type === 'checkbox')
      dispatch(action({ ...itemData, [input.key]: !itemData[input.key] }));
    else if (input.type === 'date')
      dispatch(action({ ...itemData, [input.key]: e.target.value.substring(0, 10) }));
    else dispatch(action({ ...itemData, [input.key]: e.target.value }));
  };

  return (
    <form className={style.form} onSubmit={submitHandler}>
      {data.map((item) => {
        return (
          <div
            key={item.key}
            className={item.type === 'checkbox' ? style.check : style.inputContainer}
          >
            {item.type !== 'checkbox' && <label htmlFor={item.key}>{item.header}</label>}
            {item.type === 'select' ? (
              <select
                id={item.key}
                required={item.required}
                value={itemData ? itemData[item.key] : ''}
                onClick={(e) => handleChange(e, item)}
              >
                <option selected disabled value="">{`select ${item.header}`}</option>
                {item.options.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.text}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={item.type}
                id={item.key}
                required={item.required}
                {...(item.type === 'checkbox' && {
                  checked: itemData ? itemData[item.key] : false
                })}
                value={itemData ? itemData[item.key] : item.type === 'checkbox' ? true : ''}
                onChange={(e) => handleChange(e, item)}
              />
            )}
            {item.type === 'checkbox' && <label htmlFor={item.key}>{item.header}</label>}
          </div>
        );
      })}
      <div className={style.btnsContainer}>
        <Button classes={'red'} onClick={() => goBack()}>
          Back
        </Button>
        <Button>Save</Button>
      </div>
    </form>
  );
};

export default withRouter(Form);
