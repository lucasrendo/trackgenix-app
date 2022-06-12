const url = `${process.env.REACT_APP_API_URL}/tasks`;

export const getTasksRequest = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();

    return data;
  } catch (error) {
    return error;
  }
};

export const getSingleTaskRequest = async (id) => {
  try {
    const response = await fetch(`${url}/${id}`);
    const data = await response.json();

    return data;
  } catch (error) {
    return error;
  }
};

export const createTaskRequest = async (object) => {
  try {
    const requestConfig = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(object)
    };

    const response = await fetch(`${url}`, requestConfig);
    const data = await response.json();

    return data;
  } catch (error) {
    return error;
  }
};

export const updateTaskRequest = async (object, id) => {
  try {
    const requestConfig = {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(object)
    };

    const res = await fetch(`${url}/${id}`, requestConfig);
    const data = await res.json();

    return data;
  } catch (error) {
    return error;
  }
};

export const deleteTaskRequest = async (id) => {
  try {
    const requestConfig = {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      }
    };

    const response = await fetch(`${url}/${id}`, requestConfig);
    const data = await response.json();

    return data;
  } catch (error) {
    return error;
  }
};
