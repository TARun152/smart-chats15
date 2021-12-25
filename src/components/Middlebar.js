import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from './context/AuthContext'
import Post from './Post'
import { Link } from 'react-router-dom'
import image from '../assests/user.png'
export default function Middlebar() {
    const { user } = useContext(AuthContext)
    const [users, setusers] = useState([])
    const [posts, setposts] = useState(null)
    useEffect(() => {
        const getpost = async () => {
            try {
                const res = await axios.get(process.env.URL+`api/posts/timeline/${user?._id}`)
                setposts(res.data.sort((p1, p2) => {
                    // for sorting latest post on top
                    return new Date(p2.createdAt) - new Date(p1.createdAt)
                }))
            } catch (error) {
                console.log(error)
            }
        }
        getpost()
        const handle = async () => {
            const res = await axios.get(process.env.URL+`api/users/`)
            setusers(res.data)
        }
        handle()
    }, [user])
    return (
        <div>
            {
                posts?.length !== 0 ?
                    <>
                        {posts?.map((e) => (
                            <Post post={e} bool={false}/>
                        )
                        )}
                    </> :
                    <div>
                        <div style={{textAlign:'center',paddingTop:'10px',paddingBottom:'10px'}}>
                        <h1><b>Follow these people to see their post:-</b></h1>
                        </div>
                        <>
                        <ul className="nav nav-pills flex-column mb-auto py-2">
                            {
                                users.map((e) => (
                                    <li className="nav-link link-dark text-decoration-none">
                                        <div className="d-flex card-body">
                                        <Link to={`/profile/${e?.name}`}><div style={{height:'13vw',width:'13vw',display: 'flex', justifyContent: 'center',alignItems:'center',border:'solid white 3px',backgroundColor:'black',overflow:'hidden'}} class="avatar rounded-circle"><img src={e?.profilePicture ? e?.profilePicture : image} alt="" style={{maxHeight:'100%',maxWidth:'100%'}}/></div></Link>
                                            <div style={{ width: '60%', height: '13vw', position: 'relative', left: '3vw', display: 'flex', alignItems: 'center' }}>
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
                        </>
                    </div>
            }
        </div>
    )
}
