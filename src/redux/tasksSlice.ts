import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Task, NewTask } from 'src/containers/ToDoList/types';
import { addTask, editTask, deleteTask } from 'src/helpers/tasksAPI';
import { RootState } from './store';

export interface TasksState {
  tasks: Task[];
  isLoading: boolean;
}

const initialState: TasksState = {
  tasks: [],
  isLoading: false,
};

export const addTaskAsync = createAsyncThunk(
  'tasks/addTask',
  async (task: NewTask) => {
    const response = await addTask(task);
    return response.data;
  }
);

export const editTaskAsync = createAsyncThunk(
  'tasks/editTask',
  async (task: Task) => {
    const response = await editTask(task);
    return response.data;
  }
);

export const deleteTaskAsync = createAsyncThunk(
  'tasks/deleteTask',
  async (taskId: string) => {
    const response = await deleteTask(taskId);
    return response.data;
  }
);

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addTaskAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addTaskAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = [action.payload, ...state.tasks];
      })

      .addCase(editTaskAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editTaskAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = state.tasks.map((task) => task.id === action.payload.id ? action.payload : task);
      })

      .addCase(deleteTaskAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTaskAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      })
  },
});

export const tasks = (state: RootState) => state.tasks.tasks;
export const isLoading = (state: RootState) => state.tasks.isLoading;

export default tasksSlice.reducer;
