import React, { useContext, useEffect, useState } from 'react'
import image from '../assests/cover.jpg'
import image1 from '../assests/user.png'
import { AuthContext } from './context/AuthContext'
import { storage } from '../firebase'
import axios from 'axios'
import { useHistory } from 'react-router'
export default function Profilepic(props) {
    const { user: curruser } = useContext(AuthContext)
    const [profile, setprofile] = useState(null)
    const [cover, setcover] = useState(null)
    const history = useHistory()
    const handleprofile = (e) => {
        if (e.target.files[0]) {
            setprofile(e.target.files[0])
        }
    }
    const handlecover = (e) => {
        if (e.target.files[0]) {
            setcover(e.target.files[0])
        }
    }
    const handleprofileUpload = (e) => {
        e.preventDefault()
        props.progress(10)
        const uploadTask = storage.ref(`images/${profile?.name}`).put(profile)
        props.progress(30)
        uploadTask.on(
            "state_changed",
            snapshot => { },
            error => {
                console.log(error);
            },
            () => {
                storage
                    .ref("images")
                    .child(profile?.name)
                    .getDownloadURL()
                    .then(url => {
                        props.progress(70)
                        axios.put(process.env.URL+`api/users/${props.user?._id}`, {
                            profilePicture: url
                        }).then(
                            props.progress(100),
                            history.push('/')
                        )
                    }
                    )
            }
        )
    }
    const handlecoverUpload = (e) => {
        e.preventDefault()
        props.progress(10)
        const uploadTask = storage.ref(`images/${cover?.name}`).put(cover)
        props.progress(30)
        uploadTask.on(
            "state_changed",
            snapshot => { },
            error => {
                console.log(error);
            },
            () => {
                storage
                    .ref("images")
                    .child(cover?.name)
                    .getDownloadURL()
                    .then(url => {
                        props.progress(70)
                        axios.put(process.env.URL+`api/users/${props.user?._id}`, {
                            coverPicture: url
                        }).then(
                            props.progress(100),
                            history.push('/')
                        )
                    }
                    )
            }
        )
    }
    return (
        <>
            <div className="dp">
                <div style={{ display: 'flex', justifyContent: 'center', height: '85%', backgroundColor: '#535151' }} className="dp">
                    <img style={{ maxWidth: '100%', height: '100%' }} src={props.user?.coverPicture ? props.user?.coverPicture : image} alt="" />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', position: 'relative', top: '-14vw' }}>
                    {/* for circle dp */}
                    <div style={{ height: '20vw', width: '20vw', display: 'flex', justifyContent: 'center', alignItems: 'center', border: 'solid white 3px', backgroundColor: 'black', overflow: 'hidden' }} class="avatar rounded-circle"><img src={props.user?.profilePicture ? props.user?.profilePicture : image1} alt="" style={{ maxHeight: '100%', maxWidth: '100%' }} /></div></div>
                <strong style={{ display: 'flex', justifyContent: 'center', position: 'relative', top: '-13vw', width: '100%' }}>{props.user?.name}</strong>
            </div>
            <div className="dp1">
            <strong style={{ display: 'flex', justifyContent: 'center', width: '100%', textAlign: 'center' }}>{props.user?.desc}</strong></div>
            <div style={{ display: curruser?._id !== props.user?._id ? 'none' : ''}} className="padding">
                <div type="button" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fas fa-camera fa-2x"></i><b> Update profile picture</b></div>
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header" style={{ color: 'white', backgroundColor: 'black' }}>
                                <h5 class="modal-title" id="exampleModalLabel"><b>Upload profile picture</b></h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <form onSubmit={handleprofileUpload}>
                                    <div class="mb-3">
                                        <label htmlFor="file"></label><input id="file" type="file" onChange={handleprofile} />
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button className='btn btn-primary' data-bs-dismiss="modal" type='submit' disabled={profile === null ? 'true' : ''}>Upload</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div type="button" data-bs-toggle="modal" data-bs-target="#exampleModal1"><i class="fas fa-camera fa-2x"></i><b> Update cover picture</b></div>
                <div class="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header" style={{ color: 'white', backgroundColor: 'black' }}>
                                <h5 class="modal-title" id="exampleModalLabel"><b>Upload cover picture</b></h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <form onSubmit={handlecoverUpload}>
                                    <div class="mb-3">
                                        <label htmlFor="file1"></label><input id="file1" type="file" onChange={handlecover} />
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button className='btn btn-primary' data-bs-dismiss="modal" type='submit' disabled={cover === null ? 'true' : ''}>Upload</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
