import React, { useState } from 'react';

const AddProject = ({ addProject }) => {
  const [projectImput, setProject] = useState({
    name: '',
    description: '',
    admin: '',
    client: ''
  });
  const onChange = (e) => {
    setProject({ ...projectImput, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const postProject = {
      method: 'POST',
      Headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        name: projectImput.name,
        description: projectImput.description,
        admin: projectImput.admin,
        client: projectImput.client
      })
    };
    const url = `${process.env.REACT_APP_API_URL}/projects`;
    fetch(url, postProject)
      .then((response) => response.json())
      .then((data) => console.log('data', data));
    addProject(projectImput);
    setProject({
      name: '',
      description: '',
      admin: '',
      client: ''
    });
  };
  return (
    <div>
      <h2>Add new Project</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label>name</label>
          <input
            type="text"
            name="name"
            value={projectImput.name}
            onChange={onChange}
            required
          ></input>
        </div>
        <div>
          <label>description</label>
          <input
            type="text"
            name="description"
            value={projectImput.description}
            onChange={onChange}
            required
          ></input>
        </div>
        <div>
          <label>admin</label>
          <input
            type="text"
            name="admin"
            value={projectImput.admin}
            onChange={onChange}
            required
          ></input>
        </div>
        <div>
          <label>client</label>
          <input
            type="text"
            name="client"
            value={projectImput.client}
            onChange={onChange}
            required
          ></input>
        </div>
        <input type="submit" value="addProject"></input>
      </form>
    </div>
  );
};

export default AddProject;
