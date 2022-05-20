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
  const {user,setisFetching,setuser,token}= useContext(AuthContext)
  // used for user not logging out on refresh
  const getUser=async(id)=>{
    const user1=await axios.get(process.env.REACT_APP_URL+`api/users/${id}`)
    setuser(user1.data)
    setisFetching(false)
    console.log(user1.data)
  }
  const [Progress,setProgress] = useState(0);
  const handleId=async(token)=>{
    try{
    const res=await axios.get(process.env.REACT_APP_URL+'api/auth/verify',{
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
  }, [token])
  return (
    <Router basename="/smart-chats15">
      <LoadingBar color='white' height='3px' progress={Progress} />
      <Switch>
          <Route exact path="/">
            {user?._id||token||sessionStorage.getItem('token')?<Home />:<Register/>}
          </Route>
          <Route exact path="/messenger">
            {user?._id||token||sessionStorage.getItem('token')?<Messenger/>:<Register/>}
          </Route>
          <Route exact path="/login">
          {user?._id||token||sessionStorage.getItem('token')?<Redirect to="/" />:<Login/>}
          </Route>
          <Route exact path="/signup">
          {user?._id||token||sessionStorage.getItem('token')?<Redirect to="/" />:<Register/>}
          </Route>
          <Route exact path="/profile/:username">
          {user?._id||token||sessionStorage.getItem('token')?<Profile progress={setProgress}/>:<Register/>}
          </Route>
          <Route exact path="/search/:username">
            {user?._id||token||sessionStorage.getItem('token')?<Search/>:<Register/>}
          </Route>
        </Switch>
        </Router>
  );
}
export default App;
