import React,{useEffect,useContext} from 'react'
import { AuthContext } from '../components/context/AuthContext'
import Leftbar from '../components/Leftbar'
import Middlebar from '../components/Middlebar'
import Navbar from '../components/Navbar'
import Rightbar from '../components/Rightbar'
export default function Home() {
  useEffect(() => {
    window.scrollTo(0,0)
  }, [])
  const {user} = useContext(AuthContext)
    return (
      // used because i have to wait till user comes and final data is gonna shown
      <>
      {user!==null?
        <>
    <Navbar/>
    <div className="d-flex">
      <div className="top" style={{ position: 'relative', top: '57px', left: '1vw' }}>
      <Middlebar/>
      </div>
      <div style={{ position: 'relative', top: '65px', left: '2vw'}}><Rightbar/></div>
    </div>
    </>:
    <div></div>
      }
      </>
    )
}
