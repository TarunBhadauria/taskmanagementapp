import { createSlice } from "@reduxjs/toolkit";

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: [],
    reducers: {
      addTask: (state, action) => {
        state.push({ ...action.payload, id: Date.now(), completed: false });
      },
      deleteTask: (state, action) => {
        return state.filter(task => task.id !== action.payload);
      },
      updateTask:(state,action)=>{
        const {id,title,description,dueDate} = action.payload;
        const currentTask = state.find((task)=>task.id===id);
        if(currentTask){
          currentTask.title=title;
          currentTask.description=description;
          currentTask.dueDate = dueDate;4
        }
      },

      toggleCompleted: (state, action) => {
        const task = state.find(task => task.id === action.payload);
        if (task) {
          task.completed = !task.completed;
        }
      },
    },
  });
  
  export const { addTask, deleteTask, toggleCompleted,updateTask,checkDate } = tasksSlice.actions;
  export default tasksSlice.reducer;
  