import React, { useState } from 'react';
import styles from './editProjects.module.css';

const EditProjects = () => {
  const [projectInput, setProjectInput] = useState({
    _id: '',
    projectName: '',
    description: '',
    isActive: true,
    admin: '',
    client: '',
    startDate: '',
    endDate: ''
  });

  const [isActiveInput, setIsActiveInput] = useState({
    isActive: false
  });

  const onChange = (e) => {
    setProjectInput({ ...projectInput, [e.target.name]: e.target.value });
  };

  const onChangeBoolean = (e) => {
    setIsActiveInput({ ...isActiveInput, [e.target.name]: e.currentTarget.checked });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const putProject = {
      method: 'PUT',
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
    const params = new URLSearchParams(window.location.search);
    const projectId = params.get('id');
    const url = `${process.env.REACT_APP_API_URL}/projects/${projectId}`;

    fetch(url, putProject)
      .then((response) => response.json())
      .then(() => alert('Project edited successfully'));
  };
  return (
    <div className={styles.container}>
      <div>
        <h2>Edit a project</h2>
      </div>
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
            onChange={onChangeBoolean}
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
            type="text"
            name="startDate"
            value={projectInput.startDate}
            onChange={onChange}
            required
          ></input>
        </div>
        <div>
          <label>End Date</label>
          <input
            type="text"
            name="endDate"
            value={projectInput.endDate}
            onChange={onChange}
            required
          ></input>
        </div>
        <input type="submit" value="editProject"></input>
      </form>
    </div>
  );
};

export default EditProjects;
