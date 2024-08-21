import React, { useContext, useEffect, useState } from 'react'
import AddProjects from './AddProjects'
import { userProjectAPI } from '../services/allAPI';
import { addProjectResponseContext } from '../contexts/ContextShare';
import { Alert } from 'react-bootstrap';
import EditProject from './EditProject';

function MyProjects() {
    const {addprojectResponse,setAddProjectResponse}=useContext(addProjectResponseContext)
    const [userProjects, setUserProjects] = useState([]);

  const getUserStorage = async () => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token");
      const reqHeaders = {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`,
      };
      const result = await userProjectAPI(reqHeaders);
      if (result.status === 200) {
        setUserProjects(result.data);
      } else {
        console.log(result);
        console.log(result.response.data);
      }
    }
  };

  useEffect(() => {
    getUserStorage();
  }, [addprojectResponse]);
  return (
    <div className='card shadow p-3 mt-3 ms-2 mb-3'>
        <div className="d-flex">
            <h2>My projects</h2>
            <div className="ms-auto">
                <AddProjects/>
            </div>
            {
                addprojectResponse.title?<Alert className="bg-success" dismissible>{addprojectResponse.title} <span>added successfully</span> 
                </Alert>:null
            }
        </div>
        <div className="mt-4">
            
        {userProjects?.length > 0 ? (
          userProjects.map((project) => (
            <div className="border d-flex align-items-center justify-content-between round p-2">
              <h5 className="p-1">{project.title}</h5>
              <div className="icon-ms-auto">
                <button className="btn btn-outline">
                  <a href={project.github} style={{ textDecoration: "none" }}>
                    <i class="fa-brands fa-github"></i>
                  </a>
                </button>
                <EditProject project={project}/>

                <button className="btn btn-outline">
                  <i class="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
          ))
        ) : (
          <p style={{ color: "yellow" }}>No Projects Uploaded Yet</p>
        )}
           
            
        </div>
        
    </div>
  )
}

export default MyProjects