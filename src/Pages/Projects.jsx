import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { Col, Row } from 'react-bootstrap'
import ProjectCard from '../Components/ProjectCard'
import { allProjectAPI } from '../services/allAPI'

function Projects() {

  const [searchKey,setSearchKey]=useState("")


const [allProject,setAllProject]=useState([])

const getAllProject = async ()=>{
  if(sessionStorage.getItem('token')){
    const token = sessionStorage.getItem('token')
    const reHeaders = {
      "Content-Type":"application/json",
      "Authorization": `Bearer ${token}`
    }
    const result = await allProjectAPI(searchKey,reHeaders)
    if(result.status===200){
      setAllProject(result.data)
    }else{
      console.log(result);
    }
  }
}
console.log(allProject)
useEffect(()=>{
  getAllProject()
},[searchKey])




  return (
    <>
      <Header/>
      <div className="projects" style={{marginTop:"100px"}}>
        <h1 className='text-center mb-5'>All Projects</h1>
    <div className='d-flex justify-content-center align-items-center w-100'>
      <div className='d-flex border w-50 mb-3'>
        <input type="text" onChange={e=>setSearchKey(e.target.value)} className='form-control rounded-2' placeholder='search projects' />
        <button className='btn btn-outline-success'>Search</button>

      </div>


    </div>
    <Row className='mt-5 container-fluid mb-5 ms-4'>


      {
        allProject?.length>0?allProject?.map(project=>(
          <Col sm={12} md={6} lg={4}>
      <ProjectCard project={project}/>
      </Col>
        )):<p>Please Login..!</p>
      }



    </Row>
      </div>
    </>
  )
}

export default Projects