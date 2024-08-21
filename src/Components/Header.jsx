import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';


function Header({insideDash}) {
  return (
    <div>
        <Navbar className="bg-secondary">
        <Container>
          <Navbar.Brand href="#home">
            <Link to={'/'} style={{textDecoration:"none",color:"yellow",fontWeight:"bolder"}}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/1/10/MS_Project_Logo.png" alt="" height={50} width={50} />
                Project Fair
            </Link>
            
          </Navbar.Brand>
          {insideDash&&
            <button className='btn align-items-right btn-danger'>Logout</button>}
        </Container>
      </Navbar>
    </div>
  )
}

export default Header