import React,{ useContext, useEffect,useState} from 'react'
import image from '../assests/gift-1020-542634.png'
import image1 from '../assests/crowd1.jpg'
import { AuthContext } from './context/AuthContext'
import Onlinefriends from './Onlinefriends'
export default function Rightbar() {
  const {user} = useContext(AuthContext)
  const [friends, setfriends] = useState([])
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
  return (
    <div className="p-3 bg-light right">
      <ul className="nav nav-pills flex-column mb-auto">
        <div style={{ display: 'flex', alignItems: 'center',width:'28vw'}}>
          <div style={{ height: '55px', width: '50px' }}><img style={{ maxHeight: '100%', maxWidth: '100%' }} src={image} alt="" /></div><p><strong>Tarun</strong> and <strong>3 others</strong> have birthday today!! wish them now</p>
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
