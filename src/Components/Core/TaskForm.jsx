import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../../slices/taskSlice';
import './TaskForm.css'
import toast from 'react-hot-toast';
import { toggleForm } from '../../slices/formSlice';

const TaskForm = () => {
  const dispatch = useDispatch();

  const [taskData, setTaskData] = useState({ title: '', description: '', dueDate: '' });
  const isAddTask = useSelector(state => state.form);
  const titleRef = useRef();
  useEffect(() => {
    // titleRef.current.focus();
  }, []);


  const checkDate = (actualDate,selectedDate) => {
     actualDate = Number(`${actualDate.getFullYear()}${actualDate.getMonth() + 1}${actualDate.getDate()}`);
     selectedDate = Number(`${selectedDate.getFullYear()}${selectedDate.getMonth() + 1}${selectedDate.getDate()}`);
     return selectedDate>=actualDate;
  }

  const handleSubmit = (e) => {

    const currDate = new Date();
    const dueDate = new Date(taskData.dueDate);

    e.preventDefault();
    if (!taskData.title || !taskData.dueDate || !taskData.description) {
      toast.error('Please fill all the fields')
      return;
    }
    else if (!checkDate(currDate,dueDate)) {
      toast.error('Invalid Date');
      return;
    }


    dispatch(addTask({ title: taskData.title, description: taskData.description, dueDate: taskData.dueDate }));
    setTaskData({ title: '', dueDate: '', description: '' });
    toast.success('Task added Successfully');
  };


  const handleChange = (e) => {
    setTaskData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      {isAddTask ?
        <form onSubmit={handleSubmit} className='taskFrom'>
          <input type="text" ref={titleRef} className='taskInput' name='title' value={taskData.title} onChange={handleChange} placeholder="Title" />
          <input type="text" className='taskInput' name='description' value={taskData.description} onChange={handleChange} placeholder="Description" />
          <input type="date" className='taskInput' name='dueDate' value={taskData.dueDate} onChange={handleChange} placeholder="Due Date" />
          <button type="submit" className='addTask'>Add Task</button>
        </form> :
        <button className='addTask' onClick={() => { dispatch(toggleForm()) }}>Add task</button>}
    </>
  );
};

export default TaskForm;
