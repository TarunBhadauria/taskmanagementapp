
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../slices/filterSlice';
import './Filter.css'
const Filter = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks)

  const handleChange = e => {
    dispatch(setFilter(e.target.value));
  };

  return (
    <>
      { tasks.length>0 &&
        <select onChange={handleChange} className='filterSelect'>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="uncompleted">Uncompleted</option>
        </select>
      }
    </>
  );
};

export default Filter;