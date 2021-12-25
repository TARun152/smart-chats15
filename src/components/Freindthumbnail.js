import React,{useState,useEffect} from 'react'
import image from '../assests/user.png'
import axios from 'axios'
import { Link } from 'react-router-dom'
export default function Freindthumbnail(props) {
    const [user, setuser] = useState({})
    useEffect(() => {
        const fetchdata=async ()=>{
            const res=await axios.get(process.Env.PORT+`api/users/${props.id}`)
            setuser(res.data)
        }
        fetchdata()
    },[props.id])
    return (
            <div className="d-flex nav-link link-dark text-decoration-none">
              <Link to={`/profile/${user?.name}`}><div style={{height:'12vw',width:'12vw',display: 'flex', justifyContent: 'center',alignItems:'center',border:'solid white 3px',backgroundColor:'black',overflow:'hidden',position:'relative',left:'-1.5vw'}} class="avatar rounded-circle"><img src={user?.profilePicture ? user?.profilePicture : image} alt="" style={{maxHeight:'100%',maxWidth:'100%'}}/></div></Link>
              <div style={{width:'14vw',height:'12svw',position:'relative',left:'-2.5vw',display:'flex',alignItems:'center'}}>
            <ul style={{listStyle:'none',fontSize:'1.3vw'}}>
                <li><strong>{user?.name}</strong></li>
                <li><b>City:</b> {user?.city ? user?.city : "Unknown"}</li>
            <li><b>From:</b> {user?.from ? user?.from : "Unknown"}</li>
            <li><b>Relationship Status:</b> {user?.relationship ? user?.relationship : "Unknown"}</li>
            </ul>
                </div>
              </div>
    )
}
