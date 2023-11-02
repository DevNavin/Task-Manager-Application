import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

const taskData = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.data.push(action.payload);
    },
    editTask: (state, action) => {
      state.data = state.data.map((d) => {
        if (d?.id === action.payload.id) {
          return { ...action.payload };
        }
        return d;
      });
    },
    deleteTask: (state, action) => {
      state.data = state.data.filter((d) => d.id !== action.payload.id);
    },
    sortTask: (state, action) => {
      const { field } = action.payload;
      if (field === "status") {
        state.data = state.data.sort((a, b) =>
          b[field].toLowerCase().localeCompare(a[field].toLowerCase())
        );
      } else {
        state.data = state.data.sort((a, b) => {
          var dateA = new Date(a.created_at).getTime();
          var dateB = new Date(b.created_at).getTime();
          return dateA > dateB ? -1 : 1;
        });
      }
    },
  },
});

export default taskData.reducer;
export const { addTask, editTask, deleteTask, sortTask } = taskData.actions;
