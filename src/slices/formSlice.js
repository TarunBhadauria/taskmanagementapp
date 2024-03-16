import { createSlice } from '@reduxjs/toolkit';

const formSlice = createSlice({
  name: 'form',
  initialState: false,
  reducers: {
    toggleForm: (state) => {
       return state=!state;
    },
  },
});

export const { toggleForm } = formSlice.actions;
export default formSlice.reducer;
