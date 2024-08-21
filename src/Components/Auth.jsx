import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { loginAPI, registerAPI } from '../services/allAPI'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";


function Auth({register}) {

const isRegisterForm = register?true:false
const navigate=useNavigate()
const [userData,setUserData]=useState({
    username:"",email:"",password:""
})

const handleRegister =async (e)=>{
   e.preventDefault()
   const {username,email,password}=userData
   if(!username || !email || !password){
    toast.warning("please enter the fields")
   }
   else{
    const result = await registerAPI(userData)
    console.log(result);
    if(result.status === 200){
        console.log(result);
       toast.success(`${result.data.username} has successfully registered`)
        setUserData({
            username:"",email:"",password:""
        })
        navigate('/login')
    }
    else{
        alert(result.response.data)
        console.log(result);
    }

   }
}

const handleLogin = async (e)=>{
    e.preventDefault()
    const {email,password}=userData
    if(!email || !password){
     alert("please enter the fields")
    }
    else{
     const result = await loginAPI(userData)
     console.log(result);
     if(result.status === 200){
         console.log(result);
        // alert(`${result.data.username} has successfully registered`)
        sessionStorage.setItem("existUser",JSON.stringify(result.data.existUser))
        sessionStorage.setItem("token",result.data.token)
         setUserData({
             email:"",password:""
         })
         navigate('/')
     }
     else{
         alert(result.response.data)
         console.log(result);
     }
 
    }

}

  return (
    <>
    <ToastContainer position="top-center" theme="colored" autoClose={2000} />
      
    <div style={{width:'100',height:"100vh"}} className="d-flex justify-content-center align-items-center">
    <div className="container w-75">
        <Link to={"/"} style={{textDecoration:"none",color:"White"}}><i class="fa-solid fa-house"></i> Back To Home</Link>
        <div className="card shadow p-3 bg-info">
            <div className="row align-items-center">
                <div className="col-lg-6">
                    <img src="https://peddleup.com/assets/images/bg-login.png" alt="" className=' w-100' />
                </div>
                <div className="col-lg-6">
                    <div className="d-flex align-items-center flex-column">
                    <h2 className='text-center text-black fw-bold'><i className="fa-solid fa-right-to-bracket"></i> Project Fair</h2>
                    <h4 className='fw-bolder text-black pb-3 mt-2'>
                        {
                            isRegisterForm?'Sign up to your Account':'Sign in to your Account'
                        }
                    </h4>
                    <Form className='text-light w-100'>
                        {isRegisterForm &&
                            <Form.Group className='mb-3' controlId='formBasicName'>
                            <Form.Control type='text' placeholder='Enter Username' value={userData.username} onChange={e=>setUserData({...userData,username:e.target.value})}/>
                        </Form.Group>
                        }
                         <Form.Group className='mb-3' controlId='formBasicEmail'>
                            <Form.Control type='email' placeholder='Enter email' value={userData.email} onChange={e=>setUserData({...userData,email:e.target.value})}/>
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='formBasicPassword'>
                            <Form.Control type='password' placeholder='Enter passwod' value={userData.password} onChange={e=>setUserData({...userData,password:e.target.value})}/>
                        </Form.Group>
                        {
                            isRegisterForm?
                            <div>
                                <button className='btn btn-primary mb-2' onClick={handleRegister}>Resgister</button>
                                <p className='text-dark'>Already have an account ? Click Here to <Link to={'/login'} style={{textDecoration:"none",color:"blue"}}>Login</Link></p>
                            </div>:  <div>
                                <button className='btn btn-success mb-2' onClick={handleLogin}>Login</button>
                                <p className='text-dark'>New User ? Click Here to <Link to={'/register'} style={{textDecoration:"none",color:"blue"}} >Register</Link></p>
                            </div>
                        }

                    </Form>
                  
                    </div>


                </div>
            </div>

        </div>

    </div>
    </div>
  
   
    </>
  )
}

export default Auth