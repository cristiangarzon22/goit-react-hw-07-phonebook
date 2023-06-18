

import { createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "https://648e68f72de8d0ea11e8b157.mockapi.io";

export const fetchTasks = createAsyncThunk(
  "tasks/fetchAll",
  async (_, thunkAPI) => {
    try {
      const data = await fetch(`${BASE_URL}/contacts`);
      const response = await data.json();
      return response;
      
    } catch (e) {
      thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const addTask = createAsyncThunk(
    "tasks/addTask",
    async (text, thunkAPI) => {
      try {
        const data = await fetch(`${BASE_URL}/contacts`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(
            text
          ),
          
        });
        const response = await data.json();
        return response;
      } catch (e) {
        thunkAPI.rejectWithValue(e.message);
      }
    }
  );
  