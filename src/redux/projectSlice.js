import { createSlice } from "@reduxjs/toolkit";

const projectsSlice = createSlice({
  name: "projects",
  initialState: {
    projects: [],
  },
  reducers: {
    addProjects: (state, action) => {
      if (action.payload.length === 0) {
        state.projects = [];
        return;
      }
      state.projects = action.payload;
    },
    removeProject: (state, action) => {
      const idToRemove = action.payload;
      state.projects = state.projects.filter((p) => p._id !== idToRemove);
    },
  },
});
export const { addProjects, removeProjects } = projectsSlice.actions;
export default projectsSlice.reducer;
