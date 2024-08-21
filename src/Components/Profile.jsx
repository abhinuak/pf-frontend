import React, { useState } from 'react'
import { Collapse } from 'react-bootstrap';


function Profile() {
    const [open, setOpen] = useState(false);
  return (
   <>
   <div className="card p-5 mt-3 me-2">
    <div className="d-flex justify-content-between">
    <h2>Profile</h2>
    <button  onClick={() => setOpen(!open)} className='btn btn-outline-primary'><i class="fa-solid fa-circle-chevron-down"></i></button>
    </div>
    <Collapse in={open}>
    <div className="row justify-content-center mt-3">
        <label>
            <input type="file" style={{display:"none"}} />
            <img width={150} height={150} className='rounded-circle' src="https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/3160133/person-clipart-xl.png" alt="" />
        </label>
        <div className="mt-3">
            <input type="text" className='form-control mb-2' placeholder='Github Link' />
            <input type="text" className='form-control' placeholder='LinkedIn ' />
        </div>
        <div className="mt-3 tex-center d-grid">
            <button className='btn btn-primary'>Update</button>
        </div>
        </div>
   
    </Collapse >
   
   </div>
   
   </>
  )
}

export default Profile