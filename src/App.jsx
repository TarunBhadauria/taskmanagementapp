import React from 'react';
import TaskList from './Components/Core/TaskList';
import TaskForm from './Components/Core/TaskForm';
import Filter from './Components/Core/Filter';
import { Provider } from 'react-redux';
import  { Toaster } from 'react-hot-toast';
import store from './store';
import './App.css'



const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <h1 className='text-center'>Task Management Application</h1>
        <TaskForm />
        <Filter />
        <TaskList />
        <Toaster/>
      </div>
    </Provider>
  );
};

export default App;
