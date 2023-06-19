import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
//const BASE_URL = "https://648e68f72de8d0ea11e8b157.mockapi.io";
axios.defaults.baseURL = "https://62584f320c918296a49543e7.mockapi.io";

export const fetchTasks = createAsyncThunk(
  "tasks/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/tasks");
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const addTask = createAsyncThunk(
  "tasks/add",
  async (taskData, thunkAPI) => {
    try {
      const response = await axios.post("/tasks", taskData);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/delete",
  async (taskId, thunkAPI) => {
    try {
      await axios.delete(`/tasks/${taskId}`);
      return taskId;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
