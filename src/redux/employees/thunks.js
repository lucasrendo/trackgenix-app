const resource = `${process.env.REACT_APP_API_URL}/employees`;

export const getEmployeesRequest = async () => {
  try {
    const response = await fetch(resource);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const getUniqueEmployeesRequest = async (id) => {
  try {
    const response = await fetch(`${resource}/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const createEmployeeRequest = async (object) => {
  try {
    const requestConfig = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(object)
    };
    const response = await fetch(`${resource}`, requestConfig);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const editEmployeesRequest = async (object, id) => {
  try {
    const requestConfig = {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(object)
    };
    const response = await fetch(`${resource}/${id}`, requestConfig);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const deleteEmployeesRequest = async (object, id) => {
  try {
    const requestConfig = {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(object)
    };
    const response = await fetch(`${resource}/${id}`, requestConfig);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};
