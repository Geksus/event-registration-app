import { configureStore } from "@reduxjs/toolkit";
import { getEvents } from "../../../back/controllers/eventController";

const store = configureStore({
  reducer: {
    getAllEvents: getEvents(),
  },
});

export default store;
