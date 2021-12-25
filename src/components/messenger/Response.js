import axios from 'axios'
import React, { useState,useEffect} from 'react'
export default function Response(props) {
    const [User, setUser] = useState(null)
    useEffect(() => {
        const userid= props.conversation.members.find((m)=>m!==props.user._id)
        const handle=async()=>{
            const newuser=await axios.get(process.env.URL+`api/users/${userid}`)
            setUser(newuser.data)
        }
        handle()
    },[])
    return (
        <>
        <option value={props.conversation}>{User?.name}</option>
        </>
    )
}
