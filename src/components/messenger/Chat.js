import React, { useContext,useEffect,useState} from 'react'
import {format} from 'timeago.js'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'
import image from '../../assests/user.png'
// a msg between two users
export default function Chat(props) {
    const [User, setUser] = useState(null)
    useEffect(() => {
        const handle=async()=>{
            const newuser=await axios.get(process.env.REACT_APP_URL+`api/users/${props.msg.sender}`)
            setUser(newuser.data)
        }
        handle()
    }, [props.msg.sender])
    const {user} = useContext(AuthContext)
    return (
        <div className={user._id===props.msg.sender?"mine":"other"} style={{display:'block'}}>
                <div style={{display:'flex'}}>
                <img src={User?.profilePicture?User?.profilePicture:image} alt="" width={32} height={32} className="rounded-circle me-2" />
                <div className="chat" style={{height:'100%',backgroundColor:user._id!==props.msg.sender?'#afb4b8': '#0d6efd',color:user._id!==props.msg.sender?'black': 'white',borderRadius:'25px'}}>
                    <p style={{position:'relative',top:'6px',left:'13px',width:'85%'}}>{props.msg.text}</p>
                </div>
                </div>
                <small style={{position:'relative',left:'2.5vw'}}>{format(props.msg.createdAt)}</small>
                </div>
    )
}
