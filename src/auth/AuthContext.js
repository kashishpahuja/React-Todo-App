// import userEvent from "@testing-library/user-event";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {ToastContainer,toast,Bounce} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
     //stringfy - to(json)         //parse - to{obj}
    //check user locked in state on page load
    const[user,setUser] = useState(null);
    const[message , setMessage] = useState("");
    const navigate=useNavigate(); //to redirect via function
    const checkUserStatus=async (email)=>{
        const response=await fetch(`http://localhost:5000/users?email=${email}`,{method:'GET'})
        if(response.ok){
            const userData=await response.json();
            if(userData.length>0){
                setUser(userData[0])
            }else{
                console.log("user doesn't exist")
                setUser(null)
            }
        }else{
            console.log("something went wrong")
        }
    }
    useEffect(() =>{
        let localUser = JSON.parse(localStorage.getItem("user"));
        if (localUser) {
            checkUserStatus(localUser.email);
        }
     } , []);

     //register user
     const registerUser = async (formData) =>{       
        let config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        }

        const checkUser = await fetch(`http://localhost:5000/users?email=${formData.email}` , {method:"GET"})
         
        if(checkUser.ok){
            const user = await checkUser.json();            //convert
            //console.log(user)
            if(user.length > 0){
                setMessage('user already exists!')
            }else{
                const response = await fetch("http://localhost:5000/users",config);

                if(response.status === 201){
                    const user = await response.json();
                    localStorage.setItem("user" , JSON.stringify(user))
                    setMessage('Registered Successfully!')
                    setTimeout(()=>{
                        navigate("/")
                    },1000)
                }else{
                    setMessage('something went wrong')
                }
            }
        }else{
            setMessage('something went wrong , try again!')
        }
    }
        //login user
    const loginUser = async (formData) => {
        const response = await fetch(`http://localhost:5000/users?email=${formData.email}&password=${formData.password}`,{method:"GET"})
        if(response.ok){
            const user= await response.json();
            if(user.length > 0){
                localStorage.setItem("todoUser",JSON.stringify(user[0]));           //localstorage saves token(encrypted)
                setUser(user[0]);
                setMessage('Successfully logged in!')
                navigate('/task-list')
            }else{
                setMessage('email/password incorrect')
            }
        }else{
            setMessage('something went wrong')
        }
    }

    // update user details

    const updateUser=async(formData)=>{
        const notifyUpdate=()=>toast.success('User Details Updated!', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
            });
        const config={
            method:"PATCH",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(formData)
        }
        try{
            console.log(formData)
            const response=await fetch(`http://localhost:5000/users/${formData.id}`,config)
            if(!response.ok){
                throw new Error(`!HTTP error status:${response.status}`)
            }
            const updatedUser=await response.json();
            setUser(updatedUser)
            // console.log(updateUser)
            // settmessage("User Updated Successfully!")
            notifyUpdate()
            // getAllTasks(user.id)
        }catch(error){
            // console.log(error.message)
            console.error(error)
        }
    }









    // const updatedUserDetails=async(updatedDetails)=>{
    //     try{
    // const response = await fetch(`http://localhost:5000/users/${user.id}`, {
    //     method: 'PUT', // or 'PATCH' if you want to update only specific fields
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(updatedDetails),
    //   });

    //   if (!response.ok) {
    //     throw new Error(`HTTP error! status: ${response.status}`);
    //   }

    //   const updatedUser = await response.json();
    //   setUser(updatedUser);

    //   console.log('Updated user details:', updatedUser);
    // } catch (error) {
    //   console.error('Failed to update user details:', error);
    // }}
    
    const logout=(e)=>{
        e.preventDefault()
        localStorage.removeItem("todoUser")
        setUser(null)
        navigate("/login")
    }
    

    return(
        <AuthContext.Provider value={{
            user,
            message,
            registerUser,
            updateUser,
            loginUser,
            logout,
            setMessage
        }}>
            {children}
        </AuthContext.Provider>
    )
}


export default AuthContext;