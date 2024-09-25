import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api";

const initialState = {
  limit: 10,
  page: 1,
  events: [],
};

export const fetchAllEvents = createAsyncThunk(
  "events/fetchAllEvents",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/events");
      return response.data.events;
    } catch (error) {
      console.log(error.message);
    }
  },
);

const events = createSlice({
  name: "events",
  initialState: initialState,
  reducers: {
    setEvents: (state, action) => {
      state.events = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllEvents.fulfilled, (state, action) => {
      state.events = action.payload;
    });
  },
});

export const { setEvents } = events.actions;
export const selectEvents = (state) => state.events;

export default events.reducer;
