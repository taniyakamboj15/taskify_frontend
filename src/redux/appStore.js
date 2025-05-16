import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import Task from "./tasksSlice";
import Project from "./projectSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    tasks: Task,
    projects: Project,
  },
});
export default appStore;
