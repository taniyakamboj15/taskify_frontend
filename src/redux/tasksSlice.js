import { createSlice } from "@reduxjs/toolkit";

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
  },
  reducers: {
    addTasks: (state, action) => {
      if (action.payload.length === 0) {
        state.tasks = [];
        return;
      }
      state.tasks = action.payload;
    },
    removeTasks: (state, action) => {
      state.tasks = null;
    },
  },
});
export const { addTasks, removeTasks } = tasksSlice.actions;
export default tasksSlice.reducer;
