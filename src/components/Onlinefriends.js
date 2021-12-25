import React,{useState,useEffect} from 'react'
import image from '../assests/user.png'
import axios from 'axios'
export default function Onlinefriends(props) {
    const [user, setuser] = useState({})
    useEffect(() => {
        const fetchdata=async ()=>{
            const res=await axios.get(process.env.REACT_APP_URL+`api/users/${props.id}`)
            setuser(res.data)
        }
        fetchdata()
    },[props.id])
    return (
          <div className="d-flex align-items-center nav-link link-dark text-decoration-none">
              <img src={user.profilePicture?user.profilePicture:image} alt="" width={32} height={32} className="rounded-circle me-2" />
              <span className="position-absolute top-1 start-1 translate-middle p-2 bg-success border border-light rounded-circle">
    <span className="visually-hidden">New alerts</span>
  </span><strong>{user.name}</strong>
          </div>
    )
}
