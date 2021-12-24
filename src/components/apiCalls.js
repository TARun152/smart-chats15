import axios from "axios";

export const loginCall= async(userCredential,dispatch)=>{
    dispatch({type: "LOGIN_START"});
    try {
        const res = await axios.post('http://localhost:5000/api/auth/login',userCredential)
        dispatch({type: "LOGIN_SUCCESS",payload: res.data.user})
        sessionStorage.setItem('token',res.data.token)
    } catch (error) {
        dispatch({type: "LOGIN_FAILURE",payload: error})
    }
}
// send token get id
// get user form id
// use user in context api