import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const { createSlice } = require("@reduxjs/toolkit");
const initialState = {
  limit: 10,
  page: 1,
  events: [],
};

export const fetchAllEvents = createAsyncThunk(
  "events/fetchAllEvents",
  async ({ rejectWithValue }) => {
    try {
      const response = await api.get("/");
      console.log(response);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const events = createSlice({
  name: events,
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllEvents.fulfilled, (state, action) => {
      state.events = action.payload;
    });
  },
});

export const selectEvents = (state) => state.events;

export default events.reducer;
