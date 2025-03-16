
import { useEffect, useState } from 'react'
import {useDispatch} from "react-redux";
import './App.css'
import authService from './appwrite/auth.js';
import { login,logout } from './store/authSlice.js';
import { Header,Footer } from './component/index.js';


function App(){
  
const [loading,setLoading]=useState(true);


const dispatch=useDispatch();
 useEffect(()=>{
  authService.getCurrentUser().then((res)=>{
    if(res){
      dispatch (login({res}));
    }else{
      dispatch(logout());
    }
  }).finally(()=>setLoading(false));
 },[])

  return ! loading? (
     
  <>
 <div className='min-h-sc flex flex-wrap content content-between bg-gray-400'>
  <div className='w-full block '>
    <Header/>
    <main>
      
    </main>
    <Footer/>
  </div>
 </div>
  </>
  ):null
}

export default App
