import React, { useContext, useRef } from 'react'
import { loginCall } from '../components/apiCalls'
import { AuthContext } from '../components/context/AuthContext'
import { CircularProgress } from '@mui/material'
import { Link } from 'react-router-dom'
export default function Login() {
    const email = useRef()
    const password = useRef()
    const { user, isFetching, error, dispatch } = useContext(AuthContext)
    const handleclick = (e) => {
        e.preventDefault()
        loginCall({ email: email.current.value, password: password.current.value }, dispatch)
        
    }
    return (
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100vh',backgroundColor: 'rgb(198 195 195)'}}>
        <div className="responsive"><strong style={{fontSize:'70px'}}><span className="badge bg-primary">Smart-Chats</span></strong><p style={{fontSize:'25px',width:'25vw'}}><b> Connect with friends around world and chat with them.</b></p></div>
        <div className="w1" style={{backgroundColor:'white',position:'relative',left:'1vw',border:'solid #fcfaf8 1px',borderRadius:'10px'}}>
            <form action="" className="w1" style={{position:'relative',paddingBottom:'90px'}} onSubmit={handleclick}>
            <input type="email" required style={{ width: '90%',height:' 50px ', position: 'relative', top: '15px', borderRadius: '10px', border: 'solid #cfc9c9 2px' }} placeholder="Email" ref={email} />
                    <input type="password" required style={{ width: '90%',height:' 50px ', position: 'relative', top: '30px', borderRadius: '10px', border: 'solid #cfc9c9 2px' }} minLength="6" placeholder="Password" ref={password} />
                    <div style={{ width: '90%',height:'25px' }}><p style={{ display: 'flex', justifyContent: 'center', position: 'relative', top: '45px', color: '#1877f2' }}><b>Forgot Password?</b></p></div>
                    <button className="btn btn-primary" type="submit" style={{ width: '90%',height:' 50px ', position: 'relative', top: '60px', borderRadius: '10px' }}><b>{isFetching ? <CircularProgress color="inherit" size="4vh"/> : "Log In"}</b></button>
                    <div style={{ width: '90%' ,display: 'flex', justifyContent: 'center', position: 'relative', top: '75px',textAlign:'center'}}><b>Don't have an account?<Link to='/signup' >Create Account</Link></b></div>
            </form>
        </div>
    </div>
    )
}
