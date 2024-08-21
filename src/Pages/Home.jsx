import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import img1 from '../Asset/project-planning-header@2x.png'
import ProjectCard from '../Components/ProjectCard'
import { Link } from 'react-router-dom'
import { homeProjectAPI } from '../services/allAPI'


function Home() {

const [loggedin,setLoggedin]=useState(false)

const [homeproject,setHomeProject]=useState([])
// api call
const  getHomeProjects = async()=>{
    const result = await homeProjectAPI()
    if(result.status===200){
        setHomeProject(result.data)
      
    }
    else{
        console.log(result);
        console.log(result.response.data);
    }
}
// console.log(homeproject);



useEffect(()=>{
    if(sessionStorage.getItem("token")){
        setLoggedin(true)
    }
    else{
        setLoggedin(false)
    }
    getHomeProjects()
},[])


  return (
   <>
   <div style={{height:"1000px",width:"100%"}} className="container-fluid">
    <Row className='align-items-center mt-5 mb-4'>
        <Col sm={12} md={6} className='mt-5 mb-3'>
            <h1 className='fw-bolder text-warning ms-5'><img className='img-fluid' src="https://upload.wikimedia.org/wikipedia/commons/1/10/MS_Project_Logo.png" alt=""  width={70} height={70} />PROJECT FAIR</h1>
            <p className='ms-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, libero inventore ipsam optio repellendus iste ea voluptas perspiciatis tempore explicabo facilis cum, labore quaerat pariatur, neque eaque facere veritatis sunt.</p>
           { loggedin?
           <Link to={'/dashboard'} className='btn btn-outline-info ms-5'>Manage Your Project</Link>:
            <Link to={'/login'} className='btn btn-outline-info ms-5'>GET STARTED</Link>}
        </Col>
        <Col sm={12} md={6}>
            <img className='img-fluid' src={img1} alt="" width={500} />
        </Col>
    </Row>
    <div className="all-projects mt-5" >
        <h1 className='text-center text-info'>Explore Your Projects</h1>
        <marquee scrollAmount={12} >
        <Row className='mt-5'>
            {
            homeproject?.length>0?homeproject.map(project=>(
                    <Col sm={12} md={6} lg={4}>
                    <ProjectCard project={project}/>
                    </Col>
            )):null
            
            }
        </Row>
        </marquee>
        <div className='text-center mt-5'>
            <button className='btn btn-success'>
            <Link to={'/projects'} className='text-black' style={{textDecoration:"none"}}>View More Projects</Link>
            </button>
           
        </div>

    </div>
   </div>
 
   
   </>
  )
}

export default Home