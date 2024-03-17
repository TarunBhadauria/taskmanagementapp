import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask, toggleCompleted, updateTask } from '../../slices/taskSlice';
import './TaskItem.css'
import { TiDeleteOutline } from "react-icons/ti";
import { FaCheckCircle, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import toast from 'react-hot-toast';
const TaskItem = ({ task }) => {
  const [isEdit,setIsEdit] = useState(false);
  const [editedData,setEditedData] = useState(task);
  const dispatch = useDispatch();
  

  const handleEdit = ()=>{
    setIsEdit(!isEdit);
  }
  const handleChange = (e)=>{
    setEditedData((prevState)=>({
      ...prevState,
      [e.target.name]:e.target.value
    }))
  }

  const checkDate = (actualDate, selectedDate) => {
    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return Number(`${year}${month}${day}`);
    };

    const formattedActualDate = formatDate(actualDate);
    const formattedSelectedDate = formatDate(selectedDate);
    return formattedSelectedDate >= formattedActualDate;
  }

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
    toast.success('Task removed successfully');
  };
  const handleTaskEdit = ()=>{
    const currDate = new Date();
    const dueDate = new Date(editedData.dueDate);
    if (!editedData.title || !editedData.dueDate || !editedData.description) {
      toast.error('Please fill all the fields')
      return;
    }

    else if (!checkDate(currDate,dueDate)) {
      toast.error('Invalid Date');
      return;
    }
    dispatch(updateTask(editedData));
    setIsEdit(!isEdit);
    toast.success("Task edited successfully");
  }

  const handleToggleCompleted = () => {
    dispatch(toggleCompleted(task.id));
    task.completed ? toast.error('Task cancelled') : toast.success('Task completed');
  };


  return (
    <>
      {
        isEdit ? 
          <div className='taskItem'>
            <input type='text' name='title' value={editedData.title} onChange={handleChange}/>
            <input type='text' name='description' value={editedData.description} onChange={handleChange}/>
            <input type='date' name='dueDate' value={editedData.dueDate} onChange={handleChange}/>
            <FaEdit className='icon update' onClick={handleTaskEdit}/>
          </div>
          : <div className='taskItem '>
            <p>{task.title}</p>
            <p>{task.description}</p>
            <p>{task.dueDate}</p>
            <p>{task.completed ? 'Completed' : 'Uncompleted'}</p>
            {/* <button onClick={handleToggleCompleted} >
      {task.completed ? 'Mark as Uncompleted' : 'Mark as Completed'}
    </button> */}
            {task.completed ? <FaCheckCircle size={20} className='completed icon' onClick={handleToggleCompleted} /> : <TiDeleteOutline className='notCompleted icon' onClick={handleToggleCompleted} />}
            {/* <button onClick={handleDelete}>Delete</button>
     */}
            <div className='options'>
              <MdDelete onClick={handleDelete} className="icon delete" />
              <FaEdit className='icon update' onClick={handleEdit}/>
            </div>
          </div>
      }
    </>
  );
};

export default TaskItem;
