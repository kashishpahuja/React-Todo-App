import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function ProtectedRoute({children}) {
    const [isLoggedIn,setIsLoggedIn]=useState(false)
    const navigate=useNavigate()

    const checkUserStatus=async (email)=>{
        const response=await fetch(`http://localhost:5000/users?email=${email}`,{method:'GET'})
        if(response.ok){
            const userData=await response.json();
            if(userData.length>0){
                setIsLoggedIn(true)
            }else{
                console.log("user doesn't exist")
                setIsLoggedIn(false)
            }
        }else{
            console.log("something went wrong")
        }
    }
    useEffect(()=>{
        let localUser=JSON.parse(localStorage.getItem("todoUser"))
        if(localUser){
            checkUserStatus(localUser.email)
        }
    },[])
  return (
       isLoggedIn ? children : null
  )
}

export default ProtectedRoute