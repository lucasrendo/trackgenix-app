const url = `${process.env.REACT_APP_API_URL}/timesheets`;

export const getTimeSheetsRequest = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();

    return data;
  } catch (error) {
    return error;
  }
};

export const getSingleTimeSheetsRequest = async (id) => {
  try {
    const response = await fetch(`${url}/${id}`);
    const data = await response.json();

    return data;
  } catch (error) {
    return error;
  }
};

export const deleteTimeSheetsRequest = async (id) => {
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
