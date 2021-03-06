import axios from 'axios'
import React, { useRef,useContext } from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { AuthContext } from '../components/context/AuthContext'
import { CircularProgress } from '@mui/material'
import 'react-toastify/dist/ReactToastify.css';
export default function Register() {
    const name = useRef()
    const email = useRef()
    const password = useRef()
    const cpassword = useRef()
    const {  isFetching ,setisFetching,settoken} = useContext(AuthContext)
    const handleclick=async(e)=>{
        e.preventDefault()
        setisFetching(true)
        if(password.current.value!==cpassword.current.value)
        {
            password.current.setCustomValidity("Passwords don't match")
        }
        else{
            const newuser={
                name: name.current.value,
                email: email.current.value,
                password: password.current.value,
                cpassword: cpassword.current.value
            }
            try {
                var res=await axios.post(process.env.REACT_APP_URL+'api/auth',newuser)
                    if(res.data?.msg)
                    {
                        toast.error(res.data.msg)
                        setisFetching(false)
                    }
                    else
                    {
                    sessionStorage.setItem('token',res.data.token)
                    settoken(res.data.token)
                    }
            } catch (error) {
                toast.error(error)
                setisFetching(false)
            }
        }
    }
    return (
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100vh',backgroundColor: 'rgb(198 195 195)'}}>
            <div className="responsive"><strong style={{fontSize:'70px'}}><span className="badge bg-primary">Smart-Chats</span></strong><p style={{fontSize:'25px',width:'25vw'}}><b> Connect with friends around world and chat with them.</b></p></div>
            <div className="w1" style={{backgroundColor:'white',position:'relative',left:'1vw',border:'solid #fcfaf8 1px',borderRadius:'10px'}}>
                <form action="" className="w1" style={{position:'relative',paddingBottom:'90px'}} onSubmit={handleclick}>
                <input type="text" style={{width:'90%',height:'50px',position:'relative',top:'15px',borderRadius:'10px',border:'solid #cfc9c9 2px'}} placeholder="Username without space" pattern="^\S+$" required ref={name}/>
                    <input type="email" style={{width:'90%',height:' 50px ',position:'relative',top:'30px',borderRadius:'10px',border:'solid #cfc9c9 2px'}} placeholder="Email" required ref={email}/>
                    <input type="password" style={{width:'90%',height:'50px',position:'relative',top:'45px',borderRadius:'10px',border:'solid #cfc9c9 2px'}} placeholder="Password" required ref={password} minLength="6"/>
                    <input type="password" style={{width:'90%',height:'50px',position:'relative',top:'60px',borderRadius:'10px',border:'solid #cfc9c9 2px'}} placeholder="Confirm Password" required ref={cpassword} minLength="6"/>
                    <button className="btn btn-primary" style={{width:'90%',height:'50px',position:'relative',top:'75px',borderRadius:'10px'}} type="submit"><b>{isFetching ? <CircularProgress color="inherit" size="4vh"/> : "Sign Up"}</b></button>
                    <div style={{width:'90%',height:'50px',display:'flex',justifyContent:'center', position:'relative',top:'90px' ,textAlign:'center'}}><b>Already have an account?<Link to='/login'>Log In</Link></b></div>
                </form>
            </div>
            <ToastContainer />
        </div>
    )
}
