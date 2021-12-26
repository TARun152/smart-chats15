import React,{ useEffect, useState,useContext,useRef} from 'react'
import Navbar from '../Navbar'
import axios from 'axios'
import Conversation from './Conversation'
import { AuthContext } from '../context/AuthContext'
import Chat from './Chat'
import io from 'socket.io-client'
import Onlinefriends from '../Onlinefriends'
import image from '../../assests/user.png'
export default function Messenger() {
    const [friends, setfriends] = useState(null)
    const {user} = useContext(AuthContext)
    const socket = useRef()
    const scrollRef = useRef()
    const [convo, setconvo] = useState(null)
    const [newmessage, setnewmessage] = useState("")
    const [currentchat, setcurrentchat] = useState(null)
    const [chat,setchat]=useState(null)
    const [arrivalMsg, setarrivalMsg] = useState(null)
    const [messages, setmessages] = useState(null)
    const [onlineUsers, setonlineUsers] = useState([])
    useEffect(() => {
       socket.current=io.connect("https://socketio15.herokuapp.com/")
       socket.current.on("getMessage",data=>{
        setarrivalMsg({
            sender:data.senderId,
            text:data.text,
            createdAt: Date.now()
        })
       })
    }, [])
    useEffect(() => {
        // sending something on socket server
       socket.current.emit("addUser",user?._id)
       let a=user?.following
        if(user?.following)
        {
        a=a.concat(user?.followers.filter(f=>!user?.following.includes(f)))
        }
        else
        {
          a=user?.followers
        }
        if(a?.length!==0)
        setfriends(a)
        
    }, [user])
    useEffect(() => {
        socket.current.on("getUser",users=>{
            setonlineUsers(friends?.filter(f=>users.some(u=>u.userId===f)))
        })
    }, [friends])
    useEffect(() => {
        arrivalMsg&&currentchat?.members.includes(arrivalMsg.sender)&&setmessages(arrivalMsg)
    }, [arrivalMsg,currentchat])
    useEffect(() => {
        const handle=async()=>{
            const newconvo=await axios.get(process.env.REACT_APP_URL+`api/conversation/${user?._id}`)
            setconvo(newconvo.data)
        }
        handle()
    }, [user?._id])
    const [User, setUser] = useState(null)
    useEffect(() => {
        const handle=async()=>{
        const receiverId= currentchat?.members.find(member=>member!==user._id)
        const newuser=await axios.get(process.env.REACT_APP_URL+`api/users/${receiverId}`)
        setUser(newuser.data)
        }
        handle()
    }, [currentchat])
    // created new msg
    const handlemsg=async()=>{
        // sending msg to socket
        const receiverId= currentchat.members.find(member=>member!==user._id)
        console.log(receiverId)
        socket.current.emit("sendMessage",{
            senderId:user._id,
            receiverId,
            text:newmessage

        })
        const res=await axios.post(process.env.REACT_APP_URL+'api/messages',{
            conversationId:currentchat._id,
            sender:user._id,
            text:newmessage
        })
        setmessages(res.data)
        setnewmessage("")
    }
    // getting all chats of a convo
    useEffect(() => {
        const handle=async()=>{
            const newchat= await axios.get(process.env.REACT_APP_URL+`api/messages/${currentchat?._id}`)
            setchat(newchat.data)
        }
        handle()
    }, [currentchat,messages])
    // scrolling to end
    useEffect(() => {
    var scroll=document.getElementById("scrollable")
    scroll.scrollTop = scroll.scrollHeight;
    scroll.animate({scrollTop: scroll.scrollHeight});
    }, [chat])
    const handleclick=async(id)=>{
        const res=await axios.get(process.env.REACT_APP_URL+`api/conversation/${id}/${user._id}`)
        setcurrentchat(res.data)
    }
    // for new convo and all
    const convohandle=async(id)=>{
        const res=await axios.get(process.env.REACT_APP_URL+`api/conversation/${id}/${user._id}`)
        if(res.data!=="no convo")
        {
        setcurrentchat(res.data)
        }
        else
        {
           const res= await axios.post(process.env.REACT_APP_URL+'api/conversation',{
                senderId: user._id,
                receiverId: id
            })
            if(res.data)
            {
                const res=await axios.get(process.env.REACT_APP_URL+`api/conversation/${id}/${user._id}`)
                // a convo of2 users include members
                setcurrentchat(res.data)
            }
        }
    }
    return (
        <>
            <Navbar/>
            <div className="d-flex" style={{overflowX:'hidden',overflowY:'hidden'}}>
        <div className="p-3 bg-light bar" style={{ position: 'relative', top: '57px' }}>
            <strong style={{fontSize:'25px'}}>Conversations</strong>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
            {friends?friends.map((e)=>{
                return(
                <li onClick={()=>convohandle(e)}>
                    <Conversation conversation={e}/> 
                </li>)
            }):<div>
                <b>Add friends to start conversation</b>
            </div>
        }
            </ul>
            </div>
      <div className="midmessage" style={{ position: 'relative', top: '57px', left: '2vw' }}>
      <div className="card mb-3" style={{ height:'97.8vh'}}>
            <div className="card-body">
            { currentchat?
            <>
                <div style={{height:'5vh',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                    <div>
                <img src={User?.profilePicture?User?.profilePicture:image} alt="" width={32} height={32} className="rounded-circle me-2" />
                    <strong>{User?.name}</strong>
                    </div>
                    <div>
                        {/* arrow modal */}
                    <div className="arrow" style={{cursor:'pointer',paddingRight:'20px'}} type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i class="fas fa-arrow-down"></i></div>
                    <div className="online" style={{cursor:'pointer'}} type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop1"><i class="fas fa-blog"></i></div>
                    </div>
<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header" style={{color:'white',backgroundColor:'black'}}>
        <h5 class="modal-title" id="staticBackdropLabel"><b>Converations</b></h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <ul className="nav nav-pills flex-column mb-auto">
            {friends?friends.map((e)=>{
                return(
                <li data-bs-dismiss="modal" onClick={()=>convohandle(e)}>
                    <Conversation conversation={e}/> 
                </li>)
            }):<div>
                <b>Add friends to start conversation</b>
            </div>
        }
            </ul>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
{/* online modal */}
<div class="modal fade" id="staticBackdrop1" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header" style={{color:'white',backgroundColor:'black'}}>
        <h5 class="modal-title" id="staticBackdropLabel"><b>Online Users</b></h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <ul className="nav nav-pills flex-column mb-auto">
      {
         onlineUsers&&onlineUsers.length!==0?onlineUsers.map((e)=>(
             <li data-bs-dismiss="modal" onClick={()=>handleclick(e)} style={{cursor:'pointer'}}>
            <Onlinefriends id={e}/>
            </li>
    )):<div><b>No one is online</b></div>
        }
        </ul>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
                </div>
                <hr />
                {/* for all chats between two users */}
                <div className="textheight" id="scrollable" style={{overflowY:'scroll',overflowX:'hidden'}}>
                        {
                        chat&&chat.map((e)=>(
                             <Chat msg={e}/>
                        ))
}
                </div>
                <div style={{display:'flex',position:'absolute',bottom:'50px',width:'100%'}}>
                <textarea className="textwidth" placeholder="Write something...." style={{resize:'none',height:'20vh',borderRadius:'5px'}} value={newmessage} onChange={(e)=>setnewmessage(e.target.value)}></textarea>
                <button type="button" className="btn btn-success buttonwidth" style={{height:'40px',position:'relative',left:'3px'}} disabled={newmessage===""?'true':''} onClick={handlemsg}>Send</button>
                </div>
                </>: 
                <>
                <div className="arrow" style={{cursor:'pointer'}} type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i class="fas fa-arrow-down"></i></div>
<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header" style={{color:'white',backgroundColor:'black'}}>
        <h5 class="modal-title" id="staticBackdropLabel"><b>Coverations</b></h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <ul className="nav nav-pills flex-column mb-auto">
            {friends?friends.map((e)=>{
                return(
                <li data-bs-dismiss="modal" onClick={()=>convohandle(e)}>
                    <Conversation conversation={e}/> 
                </li>)
            }):<div>
                <b>Add friends to start conversation</b>
            </div>
        }
            </ul>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
                <div style={{fontSize:'40px',textAlign:'center',display:'flex',justifyContent:'center',alignItems:'center',height:'85vh'}}><strong>Open a conversation to start chat</strong></div>
</>
}
            </div>
            </div>
      </div>
      <div className="tar" style={{ position: 'relative', top: '65px', left: '4vw',width:'22vw'}}>
      <strong style={{fontSize:'30px'}}>Online friends</strong>
      <ul className="nav nav-pills flex-column mb-auto">
          <hr />
        {
         onlineUsers&&onlineUsers.length!==0?onlineUsers.map((e)=>(
             <li onClick={()=>handleclick(e)} style={{cursor:'pointer'}}>
            <Onlinefriends id={e}/>
            </li>
    )):<div><b>No one is online</b></div>
        }
        </ul>
      </div>
    </div>
        </>
    )
}
