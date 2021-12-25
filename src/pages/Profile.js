import React,{useEffect,useState,useContext} from 'react'
import { useParams } from 'react-router'
import About from '../components/About'
import Info from '../components/Info'
import Leftbar from '../components/Leftbar'
import Navbar from '../components/Navbar'
import Profilepic from '../components/Profilepic'
import axios from 'axios'
import Profileposts from '../components/Profileposts'
import { AuthContext } from '../components/context/AuthContext'
export default function Profile(props) {
    const [user, setuser] = useState(null)
    const {user:curruser} = useContext(AuthContext)
    const {username}=useParams()
    useEffect(() => {
        const handle=async()=>{
            const user1=await axios.get(process.env.REACT_APP_URL+`api/users/name/${username}`)
            setuser(user1.data)
        }
        handle()
        // used to scroll on top of the page
        window.scrollTo(0,0)
    }, [username])
    return (
        <>
        {
            user!==null&&curruser!==null?
        <>
        <Navbar/>
    <div className="d-flex" >
      <div style={{position:'relative',top:'57px',left:'1vw'}}><Profilepic user={user} progress={props.progress}/><About user={user} progress={props.progress}/>
      <div className="d-flex"><div className="top" style={{paddingTop:'5px'}}><Profileposts user={user}/></div><div style={{position:'relative',top:'10px',left:'1vw'}}><Info user={user}/></div></div>
      </div>
    </div>
        </>:
        <div></div>
}
        </>
    )
}
