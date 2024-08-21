import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { addProjectAPI } from '../services/allAPI';
import { addProjectResponseContext } from '../contexts/ContextShare';



function AddProjects() {
const {addprojectResponse,setAddProjectResponse}=useContext(addProjectResponseContext)
const [projectdetails,setProjectDetails]=useState({
  title:"",language:"",overview:"",github:"",websites:"",projectImage:""
})
console.log(projectdetails);

const [token,setToken]=useState("")
///
const [preview,setPreview]=useState("")

useEffect(()=>{
  if(projectdetails.projectImage){
    setPreview(URL.createObjectURL(projectdetails.projectImage))
  }
},[projectdetails.projectImage])
///
useEffect(()=>{
  if(sessionStorage.getItem("token")){
    setToken(sessionStorage.getItem("token"))
  }
  else{
    setToken("")
  }
},[])


////////////////////////////
    const [show, setShow] = useState(false);
    const handleClose = () => {
      setShow(false)
    setPreview("")
    setProjectDetails({
      title:"",language:"",overview:"",github:"",websites:"",projectImage:""

    })
    };
    const handleShow = () => setShow(true);

   const  handleAdd=async(e)=>{
    e.preventDefault()
    const {title,language,overview,github,websites,projectImage}=projectdetails
    if(!title || !language || !overview || !github || !websites || !projectImage){
      toast.warning("please fill all fields")
    }
    else{
      const reqBody = new FormData()
      reqBody.append("title",title)
      reqBody.append("language",language)
      reqBody.append("overview",overview)
      reqBody.append("github",github)
      reqBody.append("websites",websites)
      reqBody.append("projectImage",projectImage)

    if(token){
      const reqHeader ={
        "Content-Type" :"multipart/form-data",
        "Authorization": `Bearer ${token}`
       }
       const result = await addProjectAPI(reqBody,reqHeader)
       if(result.status===200){
         console.log(result.data);
         handleClose()
        setAddProjectResponse(result.data)
       }
       else{
         console.log(result);
         console.log(result.response.data);
       }
    }
    }
  

   }
  return (
    <div>
       <ToastContainer position="top-center" theme="colored" autoClose={2000} />
       
         <Button variant="primary" onClick={handleShow}>
       Add Projects
      </Button>

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
                    <input type="file" style={{display:"none"}} 
                    onChange={e=>setProjectDetails({...projectdetails,projectImage:e.target.files[0]})}  />
                    <img className='img-fluid' width={350} height={250} 
                  
                      
                     src=  {preview?preview:"https://aemi.ie/wp-content/uploads/2021/10/Project-Arts-Centre-Logo-Black-1-scaled.jpg"} alt="imgplace" />
                </label>
            </div>
            <div className="col-6">
                <div className="mb-3">
                    <input type="text" className='form-control' placeholder='Project title' value={projectdetails.title} onChange={e=>setProjectDetails({...projectdetails,title:e.target.value})} />
                </div>
                <div className="mb-3">
                    <input type="text" className='form-control' placeholder='Language Used'
                     value={projectdetails.language} onChange={e=>setProjectDetails({...projectdetails,language:e.target.value})} />
                </div>
                <div className="mb-3">
                    <input type="text" className='form-control' placeholder='Git hub link'
                     value={projectdetails.github} onChange={e=>setProjectDetails({...projectdetails,github:e.target.value})} />
                </div>
                <div className="mb-3">
                    <input type="text" className='form-control' placeholder='Website link'
                     value={projectdetails.websites} onChange={e=>setProjectDetails({...projectdetails,websites:e.target.value})} />
                </div>
                <div className="mb-3">
                    <input type="text" className='form-control' placeholder='Overview'
                     value={projectdetails.overview} onChange={e=>setProjectDetails({...projectdetails,overview:e.target.value})} />
                </div>
            </div>
         </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleAdd}>Add</Button>
        </Modal.Footer>
      </Modal>
       
    </div>
  )
}

export default AddProjects