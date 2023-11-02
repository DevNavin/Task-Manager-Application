import { configureStore } from "@reduxjs/toolkit";
import taskData from "./taskReducer";

export const store = configureStore({
  reducer: {
    taskData,
  },
});
