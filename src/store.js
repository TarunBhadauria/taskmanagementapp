import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './slices/taskSlice';
import filterReducer from './slices/filterSlice';
import formReducer from './slices/formSlice';

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    filter: filterReducer,
    form:formReducer
  },
});

export default store;
