import './App.css';
import './style.css';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import Messenger from './components/messenger/Messenger'
import { AuthContext } from './components/context/AuthContext';
import LoadingBar from 'react-top-loading-bar'
import Search from './pages/Search'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Redirect } from 'react-router';
import { useContext,useState,useEffect } from 'react';
import axios from 'axios';
function App() {
  const {user,dispatch}= useContext(AuthContext)
  // used for user not logging out on refresh
  const getUser=async(id)=>{
    const user1=await axios.get(process.Env.PORT+`api/users/${id}`)
    dispatch({type: "LOGIN_SUCCESS",payload: user1.data})
    console.log(user1.data)
  }
  const [Progress,setProgress] = useState(0);
  const handleId=async(token)=>{
    try{
    const res=await axios.get(process.Env.PORT+'api/auth/verify',{
      headers:{
        token
      }
    })
    getUser(res.data._id)
    console.log(res.data)
  }catch(error){
    console.log(error)
  }
  }
  useEffect(() => {
      if(sessionStorage.getItem('token'))
      handleId(sessionStorage.getItem('token'))
  }, [])
  return (
    <Router basename={window.location.pathname || ''}>
      <LoadingBar color='white' height='3px' progress={Progress} />
      <Switch>
          <Route exact path="/">
            {user||sessionStorage.getItem('token')?<Home />:<Register/>}
          </Route>
          <Route exact path="/messenger">
            {user||sessionStorage.getItem('token')?<Messenger/>:<Register/>}
          </Route>
          <Route exact path="/login">
          {user||sessionStorage.getItem('token')?<Redirect to="/" />:<Login/>}
          </Route>
          <Route exact path="/signup">
          {user||sessionStorage.getItem('token')?<Redirect to="/" />:<Register/>}
          </Route>
          <Route exact path="/profile/:username">
          {user||sessionStorage.getItem('token')?<Profile progress={setProgress}/>:<Register/>}
          </Route>
          <Route exact path="/search/:username">
            {user||sessionStorage.getItem('token')?<Search/>:<Register/>}
          </Route>
        </Switch>
        </Router>
  );
}
export default App;
