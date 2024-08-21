import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { Col, Row } from 'react-bootstrap'
import MyProjects from '../Components/MyProjects'
import Profile from '../Components/Profile'

function Dashboard() {

  const[username,setUsername]=useState('')
  useEffect(()=>{
    if(sessionStorage.getItem("existUser")){
      setUsername(JSON.parse(sessionStorage.getItem("existUser")).username)
    }
  },[])


  return (
    <>
    <Header insideDash/>
    <h2 className='mt-3'>Welcome,  <span className='text-info'>{username} </span></h2>
   <Row style={{marginTop:'100px'}}>
      <Col sm={12} md={8}>
       
        <MyProjects/>
      </Col>

      <Col sm={12} md={4}>
        <Profile/>
      </Col>
    </Row>
      
    </>
  )
}

export default Dashboard