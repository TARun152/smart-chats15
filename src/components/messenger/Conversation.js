import axios from 'axios'
import React, { useState,useEffect} from 'react'
import image from '../../assests/user.png'
// a convo between two users
export default function Conversation(props) {
    const [User, setUser] = useState(null)
    useEffect(() => {
        const handle=async()=>{
            const newuser=await axios.get(`http://localhost:5000/api/users/${props.conversation}`)
            setUser(newuser.data)
        }
        handle()
    },[])
    return (
            <div className="d-flex align-items-center nav-link link-dark text-decoration-none" style={{cursor:'pointer'}}>
                    <img src={User?.profilePicture?User?.profilePicture:image} alt="" width={32} height={32} className="rounded-circle me-2" />
                    <strong>{User?.name}</strong>
            </div>
    )
}
