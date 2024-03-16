import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TaskItem from './TaskItem';
import './TaskList.css'
import { toggleForm } from '../../slices/formSlice';
import { setFilter } from '../../slices/filterSlice';

const TaskList = () => {
  const tasks = useSelector(state => {
    if (state.filter === 'all') {
      return state.tasks;
    } else if (state.filter === 'completed') {
      return state.tasks.filter(task => task.completed);
    } else {
      return state.tasks.filter(task => !task.completed);
    }
  });
  const allTasks = useSelector(state => state.tasks);
  const dispatch = useDispatch();
  useEffect(() => {
    if (allTasks.length === 0) {
      dispatch(toggleForm());
      dispatch(setFilter('all'));  
    }
  }, [allTasks]);

  return (
    <div className='taskList'>
      {/* {tasks.length > 0 && <h3>Tasks</h3>} */}
      {
      
      tasks.length>0 ?  tasks.map(task => (
        <TaskItem key={task.id} task={task} />
      ))
      :allTasks.length>0&&<p className='noTasks'>No Task's present</p>
    }
    </div>
  );
};

export default TaskList;
