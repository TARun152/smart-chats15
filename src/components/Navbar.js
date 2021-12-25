import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router';
import {
  Link
} from "react-router-dom";
import { AuthContext } from './context/AuthContext';
import image from '../assests/user.png'
import axios from 'axios';
export default function Navbar() {
  const history = useHistory()
  const { user, dispatch, error } = useContext(AuthContext)
  const handlelog = () => {
    sessionStorage.removeItem('token')
    dispatch({ type: "LOGIN_FAILURE", payload: error })
    history.push('/login')
  }
  const [search, setsearch] = useState("")
  const handleSearch = async (e) => {
    e.preventDefault()
    const res = await axios.get(process.env.URL+`api/users/find/${search}`)
    history.push(`/search/${search}`)
    console.log(res.data)
  }
  return (
    <div>
      <nav className="navbar fixed-top navbar-expand-md navbar-dark" style={{ backgroundColor: '#1877f2' }}>
        <div className="container-fluid">
          <div className="navbar-brand" style={{display:'flex',alignItems:'center'}}>
          <div class="dropend">
              <img type="button" data-bs-toggle="dropdown" aria-expanded="false" src={user?.profilePicture ? user?.profilePicture : image} alt="" width={32} height={32} className="rounded-circle me-2 dropdown-toggle" />
              <ul class="dropdown-menu">
                <li><Link to={`/profile/${user?.name}`} class="dropdown-item"><b>Profile</b></Link></li>
                <li>
              <Link className="dropdown-item" to='/messenger'><b>Messages</b></Link>
              </li>
                <li onClick={handlelog} style={{ cursor: 'pointer' }} class="dropdown-item"><b>Log out</b></li>
              </ul>
            </div>
            <b>Smart-Chats</b></div>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Homepage</Link>
              </li>
              <li className="nav-item hide" style={{  alignItems: 'center' }}>
                <Link to='/messenger'><i className="fas fa-comment-alt nav-link active"></i></Link>
              </li>
            </ul>
            <form className="d-flex" onSubmit={handleSearch}>
              <input value={search} onChange={(e) => setsearch(e.target.value)} className="form-control me-2" type="search" placeholder="Search for friends" aria-label="Search" style={{ width: '30vw', borderRadius: '2vh', border: 'solid black .2vh' }} />
              <button className="btn" type="submit" style={{ display: 'flex', alignItems: 'center', backgroundColor: '#1877f2' }}> <i className="fas fa-search"></i></button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  )
}