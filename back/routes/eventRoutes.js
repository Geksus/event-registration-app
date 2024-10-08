const express = require("express");
const router = express.Router();
const {
  getEvents,
  getEventById,
  createEvent,
} = require("../controllers/eventController");

// get all events
router.get("/events", getEvents);

// get event by ID
router.get("/events/:event_id", getEventById);

//create event
router.post("/events", createEvent);

module.exports = router;
