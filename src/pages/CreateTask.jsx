import React, { useContext, useState } from 'react'
import TaskForm from '../components/TaskForm'
import TaskContext from '../context/TaskContext'
import { formatDate } from '../helper'

function CreateTask(props) {
  const {recentTasks,latestTask}=useContext(TaskContext)
  const [isUpdate,setIsUpdate]=useState(false);
  const edit=()=>{
    setIsUpdate(true);
  }
  
  
  return (
    <div className='container-fluid h-100'>
      <div className='row h-100'>
      <div className='col-lg-6 justify-content-center align-items-center bg-primary h-100 d-flex flex-column'>
        <div className="w-50">
          <TaskForm isUpdate={isUpdate} setIsUpdate={setIsUpdate} data={latestTask}/>
        </div>
      </div>
      <div className='col-lg-6 justify-content-center align-items-center h-100 d-flex flex-column'>
        <div className='card w-75 bg-primary text-white'>
         <div className='card-body'>
            {
              latestTask ?
              <>
              <div classname='d-flex justify-content-between'>
                <h3>Latest Task</h3>
                <button className='btn btn-info' onClick={edit}>Edit Task</button>
              </div>
              <h4>{latestTask.title}</h4>
              <p>{latestTask.description}</p>
              <div classname='d-flex justify-content-between'>
                <p className='mb-0 text-warning'>Modified On: {formatDate(latestTask.modifiedon)}</p>
                <p className='mb-0 text-warning'>Due Date: {formatDate(latestTask.duedate)}</p>

              </div>
              </>:
              <p>No Tasks</p>
            }
          </div>
        </div>

        <div className='card bg-primary mt-4 text-white w-75'>
                     <div className='card-body'>
                     {
                        recentTasks?.map((task)=>(
                            <div className='d-flex justify-content-between border border-warning p-2'>
                                <p className='mb-0'>{task.title}</p>
                                <p className='mb-0'>{formatDate(task.duedate)}</p>
                            </div>
                        ))
                     }
                        </div>
        </div>

      </div>
      </div>
      
    </div>
  )
}

export default CreateTask