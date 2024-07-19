import React from 'react'
import {useNavigate} from 'react-router-dom';
import { useFirebase } from "../context/Firebase";


const Logout = () => {
    const firebase=useFirebase();
    const navigate = useNavigate();

    const handleLogout=async ()=>{
         try{
            await firebase.logout1();
            navigate('/login')
         } catch(e){
            console.log(e.message)
         }
    }

  return (
    <div>
      <button onClick={handleLogout}>logout</button>
    </div>
    
  )
}

export default Logout
