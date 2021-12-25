import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'
import axios from 'axios'
import image from '../assests/user.png'
import { AuthContext } from '../components/context/AuthContext'
export default function Search() {
    const [users, setusers] = useState(null)
    const { username } = useParams()
    const {user} = useContext(AuthContext)
    useEffect(() => {
        const handle = async () => {
            const res = await axios.get(process.env.URL+`api/users/`)
            const userArray = res.data.filter((e) => e.name.includes(username))
            setusers(userArray)
        }
        handle()
    }, [username])
    return (
        <>
        {
            user!==null&&users!=null?
        <>
            <Navbar />
            <div className="container" style={{ position: 'relative', top: '57px', width: '85vw' }}>
                {
                    users.length !== 0 ?
                        <>
                            <ul className="nav nav-pills flex-column mb-auto py-2">
                                {
                                    users.map((e) => (
                                        <li className="nav-link link-dark text-decoration-none" style={{ listStyle: 'none' }}>
                                            <div className="card-body d-flex">
                                                <Link to={`/profile/${e?.name}`}><div style={{height:'15vw',width:'15vw',display: 'flex', justifyContent: 'center',alignItems:'center',border:'solid white 3px',backgroundColor:'black',overflow:'hidden'}} class="avatar rounded-circle"><img src={e?.profilePicture ? e?.profilePicture : image} alt="" style={{maxHeight:'100%',maxWidth:'100%'}}/></div></Link>
                                                <div style={{ width: '100%', height: '15vw', position: 'relative', display: 'flex', alignItems: 'center' }}>
                                                    <ul style={{ listStyle: 'none', fontSize: '2vw' }}>
                                                        <li><strong>{e?.name}</strong></li>
                                                        <li><b>City:</b> {e?.city ? e?.city : "Unknown"}</li>
                                                        <li><b>From:</b> {e?.from ? e?.from : "Unknown"}</li>
                                                        <li><b>Relationship Status:</b> {e?.relationship ? e?.relationship : "Unknown"}</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                        </>:<div style={{fontSize:'80px',display:'flex',justifyContent:'center',textAlign:'center'}}>
                            No results found
                </div>
                }
            </div>
        </>:
        <div></div>
            }
            </>
    )
}
