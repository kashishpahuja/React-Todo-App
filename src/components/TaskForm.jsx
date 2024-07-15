import React, { useState,useContext, useEffect } from 'react'
import {ToastContainer,toast,Bounce} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import TaskContext from '../context/TaskContext';
import AuthContext from '../auth/AuthContext';

function TaskForm(props) {
    const init={
        title:"",
        description:"",
        duedate:""
    }
    const [formData,setFormData]=useState(init)
    const{saveTask , tmessage,settmessage, updateTask} = useContext(TaskContext);
    const {isUpdate,setIsUpdate, data,closeBtn,isPopup }=props;
    const {user}=useContext(AuthContext);

useEffect(()=>{
    if(data && isUpdate){
        setFormData(data)
    }
},[isUpdate,data])

    const handleChange=(e)=>{
        let {value,name}=e.target;
        setFormData((prev)=>({
            ...prev,
            [name]:value,
            userid:user.id,
            modifiedon:Date()
        }))
    }

    const onCancle=()=>{
        if(isPopup){
            closeBtn.current.click()
        }else{
            setIsUpdate(false);
        }
        setFormData(init);
        // settmessage("")
    }

    const handleTask=()=>{
        saveTask(formData)
        setTimeout(()=>{
            setIsUpdate(false)
            setFormData("")
            // settmessage('')
        },3000)
    }
    const onUpdate=()=>{
        if(isPopup){
            updateTask(formData)
            closeBtn.current.click()

        }else{
            updateTask(formData)
        }
    }
    
  return (
    <div className='p-2'>
        <h3 className='text-white'> {isUpdate? "update Task" :"Create Task"}</h3>
        
        <div className="card">
            <div className="card-body d-flex flex-column">
                <div className="mb-3">
                    <label className='form-label' >Title</label>
                    <input type="text" name="title" className='form-control' value={formData.title} onChange={handleChange}/>
                    <label className='form-label'>Due Date</label>
                    <input type='datetime-local' value={formData.duedate}  className='form-control' onChange={handleChange} name="duedate" />
                    <label className='form-label'>Description</label>
                    <textarea type="text" name="description"  className='form-control' onChange={handleChange} value={formData.description} rows="10" ></textarea>
                    
                </div>
                <p>{tmessage}</p>
                <div>
                    {
                        isUpdate?
                        <>
                        <button className='btn btn-primary' onClick={onUpdate}>Update</button>
                        <button className='btn btn-warning' onClick={onCancle}>Cancle</button>
                        
                        </>:
                        // <button className='text-white bg-dark' onClick={()=>{saveTask(formData)}}>Create Task</button>
                        <button className='text-white bg-dark' onClick={handleTask}>Create Task</button>
                        
                    }</div>
            </div>
        </div> 
        <ToastContainer/>
    </div>
  )
}

export default TaskForm