import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { BASE_URL } from '../services/baseUrl';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { editProjectAPI } from '../services/allAPI';

function EditProject({project}) {


const handleupdate =async()=>{
  const {id,title,language,overview,github,websites,projectImage}=projectDetails
  if(!title || !language || !overview || !github || !websites){
    toast.warning("please fill empty fields")
  }
  else{
    const reqBody = new FormData()
    reqBody.append("title",title)
    reqBody.append("language",language)
    reqBody.append("overview",overview)
    reqBody.append("github",github)
    reqBody.append("websites",websites)
    preview?reqBody.append("projectImage",projectImage):reqBody.append("projectImage",project.projectImage)
    const token = sessionStorage.getItem("token")
    if(preview){
      const reqHeader ={
        "Content-Type" :"multipart/form-data",
        "Authorization": `Bearer ${token}`
      }
    
    }
    else{
      const reqHeader ={
        "Content-Type" :"application/json",
        "Authorization": `Bearer ${token}`
      }


  
    // api call
    const result = await editProjectAPI(id,reqBody,reqHeader)

    if(result.status===200){
      handleClose()
    }
    else{
      console.log(result);
      console.log(result.response.data);
    }



  }
}
}


  const [projectDetails,setProjectDetails]=useState({
    id:project._id,title:project.title,language:project.language,overview:project.overview,github:project.github,websites:project.websites,projectImage:""
  })

  const [preview,setPreview]=useState("")

    const [show, setShow] = useState(false);

    const handleClose = () =>  {
      setShow(false)
    setProjectDetails({
      id:project._id,title:project.title,language:project.language,overview:project.overview,github:project.github,websites:project.websites,projectImage:""

    })
    setPreview("")
    }
 
    const handleShow = () => setShow(true);
useEffect(()=>{
if(projectDetails.projectImage){
setPreview(URL.createObjectURL(projectDetails.projectImage))
}

},[projectDetails.projectImage])

  return (
    <>
              <ToastContainer position="top-center" theme="colored" autoClose={2000} />   
                
    <button className="btn btn-outline" onClick={handleShow}>
                  <i class="fa-solid fa-pen-to-square"></i>
                </button>

                <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size='lg'
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <div className="row">
            <div className="col-6">
                <label>
                    <input type="file" style={{display:"none"}} onChange={e=>setProjectDetails({...projectDetails,projectImage:e.target.files[0]})}
                    />
                    <img className='img-fluid' width={350} height={250} 
                  
                      
                     src=  {preview?preview:`${BASE_URL}/uploads${project.projectImage}`} alt="imgplace" />
                </label>
            </div>
            <div className="col-6">
                <div className="mb-3">
                    <input type="text" className='form-control' placeholder='Project title' value={projectDetails.title}p
                                         onChange={e=>setProjectDetails({...projectDetails,title:e.target.value})}

                    />
                </div>
                <div className="mb-3">
                    <input type="text" className='form-control' placeholder='Language Used'
                     value={projectDetails.language}p
                     onChange={e=>setProjectDetails({...projectDetails,language:e.target.value})} />
                </div>
                <div className="mb-3">
                    <input type="text" className='form-control' placeholder='Git hub link'
                     onChange={e=>setProjectDetails({...projectDetails,github:e.target.value})}
                     value={projectDetails.github} p />
                </div>
                <div className="mb-3">
                    <input type="text" className='form-control' placeholder='Website link'
                                         onChange={e=>setProjectDetails({...projectDetails,websites:e.target.value})}

                     value={projectDetails.websites} p />
                </div>
                <div className="mb-3">
                    <input type="text" className='form-control' placeholder='Overview'
                                         onChange={e=>setProjectDetails({...projectDetails,overview:e.target.value})}

                     value={projectDetails.overview} p />
                </div>
            </div>
         </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleupdate} >Add</Button>
        </Modal.Footer>
      </Modal>
    </>
                
                
            
  )
}

export default EditProject