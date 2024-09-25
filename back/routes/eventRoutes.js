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
router.get("events/:id", getEventById);

//create event
router.post("/", createEvent);

module.exports = router;
