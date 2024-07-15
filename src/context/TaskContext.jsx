import {createContext, useContext, useEffect, useState} from "react";
import AuthContext from "../auth/AuthContext";
import {ToastContainer,toast,Bounce} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TaskContext=createContext();

export const TaskProvider=({children})=>{
    const[tmessage, settmessage] = useState("");
    const {user}=useContext(AuthContext)
    const [allTasks,setALLtasks]=useState(null)
    const [recentTasks,setRecentTasks]=useState(null)
    const [latestTask,setLatestTask]=useState(null)
    // save task
    const saveTask=async (formData)=>{
        const notify=()=>toast.success('Task Created!', {
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
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(formData)
        }
        try{
        const response=await fetch(`http://localhost:5000/tasks`,config)
            if(!response.ok){
                throw new Error(`!Http Error Status: ${response.status}`)
            }
            // settmessage("Task created successfully");
            notify()
            getAllTasks(user.id)

        } 
        catch(error){
            console.log(error.message)
        }
    }
    const getAllTasks=async (id)=>{
        try{
            const response=await fetch(`http://localhost:5000/tasks?userid=${id}`,{method:"GET"});
            if(!response.ok){
                throw new Error(`!http error status:${response.status}`)
            }
            const tasks=await response.json();
            setALLtasks(tasks);
            let recent=tasks.slice(-3);
            setRecentTasks(recent)
            let latest=tasks[tasks.length-1];
            setLatestTask(latest)
        }catch(error){
            console.log(error.message)
        }
        
    }

    const updateTask=async(formData)=>{
        const notifyUpdate=()=>toast.success('Task Updated!', {
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
            const response=await fetch(`http://localhost:5000/tasks/${formData.id}`,config)
            if(!response.ok){
                throw new Error(`!HTTP error status:${response.status}`)
            }
            // settmessage("Task Updated Successfully!")
            notifyUpdate()
            getAllTasks(user.id)
        }catch(error){
            // console.log(error.message)
            console.error(error)
        }
    }
    
    const deleteTask=async(formData)=>{
        const notifyDelete=()=>{toast.success('Task Deleted!', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
            })};
        const config={
            method:"DELETE"
        }
        try{
            const response=await fetch(`http://localhost:5000/tasks/${formData.id}`,config)
            if(!response.ok){
                throw new Error(`!HTTP error status:${response.status}`)
            }
            // settmessage("Task Deleted Successfully!")
            notifyDelete()
            getAllTasks(user.id)
        }catch(error){
            // console.log(error.message)
            console.error(error)
        }
    }
    

    useEffect(()=>{
        if(user){
            getAllTasks(user.id);
        }
    },[user])
    return(
        <TaskContext.Provider value={{
            saveTask,
            tmessage,
            allTasks,
            updateTask,
            recentTasks,
            latestTask,
            settmessage,
            deleteTask
        }}>
            {children}
        </TaskContext.Provider>
    )
}

export default TaskContext;