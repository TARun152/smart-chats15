import axios from 'axios'
import React,{useContext,useEffect,useState}from 'react'
import { AuthContext } from './context/AuthContext'
import Post from './Post'
export default function Profileposts(props) {
    const {user:curruser} = useContext(AuthContext)
    const [posts, setposts] = useState(null)
    useEffect(() => {
        const getpost=async()=>{
            try{
            const res= await axios.get(process.env.REACT_APP_URL+`api/posts/all/${props.user?._id}`)
            setposts(res.data.sort((p1,p2)=>{
                // for sorting latest post on top
                return new Date(p2.createdAt)-new Date(p1.createdAt)
            }))
        }catch(error)
        {
            console.log(error)
        }
        }
        getpost()
    }, [props.user])
    return (
        <>
        {curruser?._id===props.user?._id||props.user?.followers.includes(curruser?._id)?
        <div>
            {posts?.length!==0?
        <>
        {posts?.map((e)=>(
            <Post post={e}/>
        )   
        )}
        </>:
        <>
        <div style={{display:'flex',justifyContent:'center'}}><b style={{fontSize:'35px',textAlign:'center'}}>Nothing to Show</b></div>
        <div style={{display:'flex',justifyContent:'center'}}><i class="fas fa-camera fa-9x"></i></div>
        </>
}
        </div>:
        <>
        <div style={{display:'flex',justifyContent:'center'}}><b style={{fontSize:'35px',textAlign:'center'}}>Follow to see posts</b></div>
        <div style={{display:'flex',justifyContent:'center'}}><i class="fas fa-camera-retro fa-9x"></i></div>
        </>
  }
 </>
    )
}
