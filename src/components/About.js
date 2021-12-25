import React,{useContext,useState,useRef,useEffect} from 'react'
import image from '../assests/user.png'
import { storage } from '../firebase'
import axios from 'axios'
import { AuthContext } from './context/AuthContext'
import { useHistory } from 'react-router'
import Freindthumb from './Friendthumb'
export default function About(props) {
    const history=useHistory()
    const {user:curruser} = useContext(AuthContext)
    const [postImage, setpostImage] = useState(null)
    const handleChange= (e)=>{
        if(e.target.files[0]){
            setpostImage(e.target.files[0])
        }
    }
    const handleUpload=(e)=>{
        e.preventDefault()
        props.progress(10)
        const uploadTask= storage.ref(`images/${postImage?.name}`).put(postImage)
        props.progress(30)
        uploadTask.on(
            "state_changed",
            snapshot =>{},
            error=>{
                console.log(error);
            },
            ()=>{
                storage
                    .ref("images")
                    .child(postImage.name)
                    .getDownloadURL()
                    .then(URL=>{
                        props.progress(70)
                        axios.post(process.env.REACT_APP_URL+'api/posts',{
        userId:props.user._id,
        img:URL,
        desc:des.current.value
                    }).then(
                        props.progress(100),
                        history.push(`/`)
                    )
                        }
                    )
            }
        )
    }
    const des = useRef()
    const [followed, setfollowed] = useState(props.user?.followers.includes(curruser?._id))
  const [friends, setfriends] = useState(null)
  useEffect(() => {
    console.log(curruser?._id)
    console.log(props.user?._id)
    console.log(props.user?.followers.includes(curruser?._id))
    setfollowed(props.user?.followers.includes(curruser?._id))
  }, [curruser,props.user?._id])
  useEffect(() => {
    let a = props.user?.following
    if (props.user?.following) {
      a = a.concat(props.user?.followers.filter(e=>!props.user?.following.includes(e)))
    }
    else {
      a = props.user?.followers
    }
    if(a.length!==0)
    setfriends(a)
  }, [props.user])
  const handlefollow=async()=>{
    if(!followed)
    {
    const res=await axios.put(process.env.REACT_APP_URL+`api/users/${props.user?._id}/follow`,{
      userId: curruser?._id
    })
    if(res.data==="you are following")
    {
      window.location.reload()
    }
  }
  else{
    const res=await axios.put(process.env.REACT_APP_URL+`api/users/${props.user?._id}/unfollow`,{
      userId: curruser?._id
    })
    if(res.data==="you are unfollowing")
    {
      window.location.reload()
    }
  }
  setfollowed(!followed)
  }
  const handleEdit=async(e)=>{
    e.preventDefault()
    if(city!==""||from!==""||relation!==""||desc!=="")
    {
    const res=await axios.put(process.env.REACT_APP_URL+`api/users/${curruser?._id}`,{
      city:city!==""?city:curruser.city,
      from: from!==""?from:curruser.from,
      relationship:relation!==""?relation:curruser.relationship,
      desc:desc!==""?desc:curruser.desc
    })
    setcity("")
    setfrom("")
    setrelation("")
    setdesc("")
    if(res.data==="successfully updated")
    {
      window.location.reload()
    }
  }
  }
  const [city, setcity] = useState("")
  const [from, setfrom] = useState("")
  const [relation, setrelation] = useState("")
  const [desc, setdesc] = useState("")
    return (
        <>
        {
            props.user!==null&&curruser!==null?
            <>
            <div className="card mb-3 upload" style={{ position: 'relative', top: '15px',display:curruser?._id!==props.user?._id?'none':''}}>
                <div className="card-body">
                    <form onSubmit={handleUpload}>
                    <div className="card-title d-flex">
                    <img src={props.user?.profilePicture? props.user?.profilePicture: image} alt="" width={40} height={40} className="rounded-circle me-2" />
                    <input className="textarea" style={{border:'none',outline:'none',position:'relative',left:'1vw'}} id="" placeholder="What's in your mind..." ref={des}></input>
                    </div>
                    <hr />
                    <div className="row row-cols-sm-1 row-cols-md-3 align-items-stretch g-2" style={{position:'relative',top:'3vh',paddingBottom:'30px'}}>
                        <div className="col" style={{position:'relative',left:'2vw'}}><i class="far fa-images fa-2x"></i><b>   Upload images</b>
                        </div>
                        <input style={{position:'relative',left:'2vw'}} type="file" id="file" onChange={handleChange}/>
                        <div style={{position:'relative',left:'2vw'}}><button className="btn btn-success" type="submit" disabled={postImage===null?'true':''}>Share</button></div>
                    </div>
                    </form>
                </div>
            </div>
            <div>
                {/* yha se info wala */}
                <div className="p-3 bg-light frnds">
      <button onClick={handlefollow} style={{display:curruser?._id===props.user?._id?'none':''}} className="btn btn-primary">{followed?'Unfollow':'Follow'}</button>
      <ul className="nav nav-pills flex-column mb-auto py-2">
        <div style={{ width: '80vw'}}>
          <strong>About {props.user?.name}</strong>
<i style={{position:'relative',left:'5vw',display:props.user?._id===curruser._id?'':'none'}} type="button" data-bs-toggle="modal" data-bs-target="#exampleModal2" class="far fa-edit"></i>
<div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header" style={{color:'white',backgroundColor:'black'}}>
        <h5 class="modal-title" id="exampleModalLabel"><b>About {props.user?.name}</b></h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <form onSubmit={handleEdit}>
          <div class="mb-3">
            <label for="city-name" class="col-form-label"><b>City:</b></label>
            <input type="text" class="form-control" id="city-name" value={city} onChange={(e)=>setcity(e.target.value)}/>
          </div>
          <div class="mb-3">
            <label for="from" class="col-form-label"><b>From:</b></label>
            <input type="text" class="form-control" id="from" value={from} onChange={(e)=>setfrom(e.target.value)}/>
          </div>
          <div class="mb-3">
            <label for="relation" class="col-form-label"><b>Relationship:</b></label>
            <input type="text" class="form-control" id="relation" value={relation} onChange={(e)=>setrelation(e.target.value)}/>
          </div>
          <div class="mb-3">
            <label for="desc" class="col-form-label"><b>Description:</b></label>
            <input type="text" class="form-control" id="desc" value={desc} onChange={(e)=>setdesc(e.target.value)}/>
          </div>
          <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button class="btn btn-primary" data-bs-dismiss="modal" type="submit">Save changes</button>
      </div>
        </form>
      </div>
    </div>
  </div>
</div>
          <ul>
            <li><b>City:</b> {props.user?.city ? props.user?.city : "Unknown"}</li>
            <li><b>From:</b> {props.user?.from ? props.user?.from : "Unknown"}</li>
            <li><b>Relationship Status:</b> {props.user?.relationship ?props.user?.relationship.length>20?props.user?.relationship.slice(0,20):props.user?.relationship : "Unknown"}</li>
          </ul>
        </div>
        <hr />
        <button type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop2" className="btn btn-secondary">Friends</button>
        <div class="modal fade" id="staticBackdrop2" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header" style={{color:'white',backgroundColor:'black'}}>
        <h5 class="modal-title" id="staticBackdropLabel"><b>Friends</b></h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <ul className="nav nav-pills flex-column mb-auto">
      {
          friends!==null?
          friends.map((e) => (
            <li data-bs-dismiss="modal" >
              <Freindthumb id={e} />
              </li>
          )
          ):<div>No friends added</div>
          }
        </ul>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
      </ul>
    </div>
            </div>
            </>:
            <div></div>
}
            </>

    )
    }