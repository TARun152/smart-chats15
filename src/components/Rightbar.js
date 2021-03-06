import React,{ useContext, useEffect,useState} from 'react'
import image from '../assests/gift-1020-542634.png'
import image1 from '../assests/crowd1.jpg'
import { AuthContext } from './context/AuthContext'
import Onlinefriends from './Onlinefriends'
import axios from 'axios'
export default function Rightbar() {
  const {user} = useContext(AuthContext)
  const [friends, setfriends] = useState([])
  const [birthdayFriends, setbirthdayFriends] = useState([])
  const todayDate= new Date()
  const getfrndsData=(e)=>{
    axios.get(process.env.REACT_APP_URL+`api/users/${e}`)
    .then(res=>{
      if(new Date(res.data?.DOB).getDate()===todayDate.getDate()&&new Date(res.data?.DOB).getMonth()===todayDate.getMonth())
          {
          setbirthdayFriends([...birthdayFriends,res.data])
          }
    })
    .catch(err=>console.log(err))
  }
  useEffect(() => {
      let a=user?.followings
      if(user?.followings)
      {
      a=a.concat(user?.followers)
      }
      else
      {
        a=user?.followers
      }
      setfriends(a)
  }, [user])
  useEffect(() => {
    if(friends?.length>0||friends)
    {
        friends.forEach(element => {
          getfrndsData(element)
        });
    }
  }, [friends])
  
  return (
    <div className="p-3 bg-light right">
      <ul className="nav nav-pills flex-column mb-auto">
        <div style={{ display: 'flex', alignItems: 'center',width:'28vw'}}>
          <div style={{ height: '55px', width: '50px' }}><img style={{ maxHeight: '100%', maxWidth: '100%' }} src={image} alt="" /></div>
          {birthdayFriends.length>1?
          <p><strong>{birthdayFriends[0]?.name}</strong> and <strong>{birthdayFriends.length-1} others</strong> have birthday today!! Wish them now</p>:
          <p><strong>{birthdayFriends.length===1?birthdayFriends[0]?.name:"No one"}</strong> has birthday today!! {birthdayFriends.length===1?"Wish now":""}</p>
          }
        </div>
        <div style={{ width: '27vw' }}>
            <img style={{width:'27vw',maxHeight:'30vh'}} className="img-fluid" src={image1} alt="" />
        </div>
        <hr />
        <strong style={{fontSize:'4vh'}}>Online friends</strong>
        {
         friends&&friends.length!==0&&friends.map((e)=>(
            <Onlinefriends id={e}/>
    ))
        }
      </ul>
    </div>
  )
}
