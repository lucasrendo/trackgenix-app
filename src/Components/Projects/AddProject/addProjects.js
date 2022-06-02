import React, { useState } from 'react';
import styles from './addProjects.module.css';

const AddProject = ({ addProject }) => {
  const [projectInput, setProject] = useState({
    projectName: '',
    description: '',
    isActive: false,
    admin: '',
    client: '',
    startDate: '',
    endDate: ''
  });
  const onChange = (e) => {
    setProject({ ...projectInput, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const postProject = {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        projectName: projectInput.projectName,
        description: projectInput.description,
        isActive: projectInput.isActive,
        admin: projectInput.admin,
        client: projectInput.client,
        startDate: projectInput.startDate,
        endDate: projectInput.endDate
      })
    };
    const url = `${process.env.REACT_APP_API_URL}/projects`;
    fetch(url, postProject)
      .then((response) => response.json())
      .then((data) => console.log('data', data));
    addProject(projectInput);
    setProject({
      projectName: '',
      description: '',
      isActive: false,
      admin: '',
      client: '',
      startDate: '',
      endDate: ''
    });
  };
  return (
    <div className={styles.container}>
      <h2>Add new Project</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label>Project name</label>
          <input
            type="text"
            name="projectName"
            value={projectInput.projectName}
            onChange={onChange}
            required
          ></input>
        </div>
        <div>
          <label>description</label>
          <input
            type="text"
            name="description"
            value={projectInput.description}
            onChange={onChange}
          ></input>
        </div>
        <div>
          <label>isActive</label>
          <input
            type="checkbox"
            name="isActive"
            value={projectInput.isActive}
            onChange={onChange}
            required
          ></input>
        </div>
        <div>
          <label>admin</label>
          <input
            type="text"
            name="admin"
            value={projectInput.admin}
            onChange={onChange}
            required
          ></input>
        </div>
        <div>
          <label>client</label>
          <input
            type="text"
            name="client"
            value={projectInput.client}
            onChange={onChange}
            required
          ></input>
        </div>
        <div>
          <label>Start date</label>
          <input
            type="date"
            name="startDate"
            value={projectInput.startDate}
            onChange={onChange}
            required
          ></input>
        </div>
        <div>
          <label>End Date</label>
          <input
            type="date"
            name="endDate"
            value={projectInput.endDate}
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
