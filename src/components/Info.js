import axios from 'axios'
import React, { useContext, useEffect, useState} from 'react'
import { AuthContext } from './context/AuthContext'
import Freindthumbnail from './Freindthumbnail'
export default function Info(props) {
  const {user:curruser,setuser} = useContext(AuthContext)
  const [followed, setfollowed] = useState(curruser?.following?.includes(props.user?._id))
  const [friends, setfriends] = useState(null)
  useEffect(() => {
    console.log(curruser?.following?.includes(props.user?._id))
    setfollowed(curruser?.following?.includes(props.user?._id))
  }, [curruser])
  useEffect(() => {
    let a = props.user?.following
    if (props.user?.following) {
      a = a.concat(props.user?.followers?.filter(e=>!props.user?.following?.includes(e)))
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
      let newfollowing;
      curruser?.following?.push(props.user?._id)
      newfollowing=curruser?.following
      setuser({...curruser,following:newfollowing})
    const res=await axios.put(process.env.REACT_APP_URL+`api/users/${props.user?._id}/follow`,{
      userId: curruser?._id
    })
  }
  else{
    let newfollowing=curruser?.following?.filter(id=>id!==props.user?._id)
      setuser({...curruser,following:newfollowing})
    const res=await axios.put(process.env.REACT_APP_URL+`api/users/${props.user?._id}/unfollow`,{
      userId: curruser?._id
    })
  }
  }
  const handleEdit=async(e)=>{
    e.preventDefault()
    if(city!==""||from!==""||relation!==""||desc!==""||dob!=="")
    {
    const res=await axios.put(process.env.REACT_APP_URL+`api/users/${curruser?._id}`,{
      city:city!==""?city:curruser.city,
      from: from!==""?from:curruser.from,
      relationship:relation!==""?relation:curruser.relationship,
      desc:desc!==""?desc:curruser.desc,
      DOB:dob!==""?dob:curruser?.DOB
    })
    setcity("")
    setfrom("")
    setrelation("")
    setdesc("")
    setdob("")
    console.log(res)
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
  const [dob, setdob] = useState("")
  return (
    <div className="p-3 bg-light right">
      <button onClick={handlefollow} style={{display:curruser?._id===props.user?._id?'none':''}} className="btn btn-primary">{followed?'Unfollow':'Follow'}</button>
      <ul className="nav nav-pills flex-column mb-auto py-2">
        <div style={{ width: '28vw'}}>
          <strong>About {props.user?.name}</strong>
<i style={{position:'relative',left:'5vw',display:props.user?._id===curruser._id?'':'none'}} type="button" data-bs-toggle="modal" data-bs-target="#exampleModal4" class="far fa-edit"></i>
<div class="modal fade" id="exampleModal4" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
          <div class="mb-3">
            <label for="desc" class="col-form-label"><b>DOB:</b></label>
            <input type="date" class="form-control" id="dob" value={dob} onChange={(e)=>setdob(e.target.value)}/>
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
            <li><b>DOB:</b> {props.user?.DOB ? new Date(props.user?.DOB).toLocaleDateString('en-GB') : "Unknown"}</li>
            <li><b>Relationship Status:</b> {props.user?.relationship ?props.user?.relationship.length>20?props.user?.relationship.slice(0,20):props.user?.relationship: "Unknown"}</li>
          </ul>
        </div>
        <hr />
        <strong style={{ fontSize: '30px' }}>Friends</strong>
        {
          friends!==null?
          friends.map((e) => (
            <li >
              <Freindthumbnail id={e} />
              </li>
          )
          ):<div>No friends added</div>
          }
      </ul>
    </div>
  )
}