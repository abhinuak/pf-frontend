import React, { useState } from 'react'
import { Button, Card, Col, Modal, Row } from 'react-bootstrap'
import { BASE_URL } from '../services/baseUrl';



function ProjectCard({project}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return (
    <div>
        
      <Card style={{ width: '18rem' }}>
      <Card.Img onClick={handleShow} variant="top" style={{height:"200px",width:"286px"}} src={project?`${BASE_URL}/uploads/${project?.projectImage}`:project?.title} />
      <Card.Body>
        <Card.Title>{project?.title}</Card.Title>
       
      </Card.Body>
    </Card>


    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          {/* <Modal.Title></Modal.Title> */}
        </Modal.Header>
        <Modal.Body>
        <Row>
            <Col md={6}>
                <img  className='img-fluid' style={{marginTop:'10px',height:"200px",width:"300px"}} src={project?`${BASE_URL}/uploads/${project?.projectImage}`:project?.title} alt="" />
            </Col>

            <Col>
            <h2 className='fw-bold text-info'>{project?.title}</h2>
            <p><b>Overview :</b> <br />{project?.overview}</p>
            <p>Language Used: <span className='fw-bolder  text-warning'>{project?.language}</span></p>
            </Col>

            <div className='me-5 fs-3 d-flex w-100 justify-content-evenly'>
                <a href={project?.github} className='me-0 text-black'><i class="fa-brands fa-github"></i></a>
                <a href={project?.websites} className='me-0 text-black'><i class="fa-solid fa-link"></i></a>
            </div>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
           cancel
          </Button>
          <Button variant="primary">get in</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ProjectCard