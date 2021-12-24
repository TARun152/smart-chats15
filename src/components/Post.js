import React,{useState,useEffect, useContext}from 'react'
import axios from 'axios'
import image from '../assests/user.png'
import {format} from 'timeago.js'
import { AuthContext } from './context/AuthContext'
import { useHistory, useParams } from 'react-router'
import { Link } from 'react-router-dom'
// post.id pr like user.id se
export default function Post(props) {
    // taking user as curruser
    const {user:curruser} = useContext(AuthContext)
    const [user, setuser] = useState({})
    const [isLiked, setisLiked] = useState()
    const [likes, setlikes] = useState(props.post.likes.length)
    const [heart, setheart] = useState()
    const history=useHistory()
    console.log(props.post)
    useEffect(() => {
        setisLiked(props.post.likes.includes(curruser?._id))
    }, [curruser])
    useEffect(() => {
        setheart(isLiked?"fas":"far")
    }, [isLiked])
    useEffect(() => {
        const fetchdata=async ()=>{
            const res=await axios.get(`http://localhost:5000/api/users/${props.post?.userId}`)
            setuser(res.data)
        }
        fetchdata()
    },[props.post?.userId])
    const handlelikes= async()=>{
       setlikes(isLiked? likes-1:likes+1)
       setheart(isLiked? "far":"fas")
       setisLiked(!isLiked)
        await axios.put(`http://localhost:5000/api/posts/${props.post._id}/like`,{userId:curruser._id})
        console.log(user._id)
        console.log(curruser._id)
    }
    const handledelete=async()=>{
        if(window.confirm("Are you sure,you want to delete this post??"))
        {
            const res=await axios.delete(`http://localhost:5000/api/posts/${props.post._id}`)
            if(res.data==="successfully deleted")
            {
                history.push(`/`)
            }
        }
    }
    return (
        <div className="card mb-3" style={{ position: 'relative', top: '8px'}}>
                <div className="card-body">
                    <div className="card-title d-flex justify-content-between">
                        <div>
                        <Link to={`/profile/${user?.name}`}>
                        <img src={user?.profilePicture? user?.profilePicture: image} alt="" width={32} height={32} className="rounded-circle me-2" />
                        </Link>
                        {/* format used for times ago */}
                        <strong>{user?.name}</strong><small style={{position:'relative',left:'1.5vw'}}>{format(props.post.createdAt)}</small>
                        </div><i style={{cursor:'pointer',display:curruser?._id!==user?._id||props.bool===false?'none':''}} onClick={handledelete} class="fas fa-trash"></i>
                    </div>
                    <p><strong>{props.post.desc}</strong></p>
                    {/* used for fixing an image inside a div with its original height */}
                    <div style={{display:'flex',justifyContent:'center'}}>
                    <img style={{maxWidth:'100%'}} src={props.post.img} alt="" />
                    </div>
                    <div style={{position:'relative',top:'5px',display:'flex', alignItems:'center',paddingTop:'10px'}}><i onClick={handlelikes} style={{cursor:'pointer'}} className={`${heart} fa-heart fa-2x`}></i><span style={{position:'relative',left:'.6vw'}}>{likes} likes</span></div>
                </div>
            </div>
    )
}
