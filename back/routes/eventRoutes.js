const express = require("express");
const router = express.Router();
const {
  getEvents,
  getEventById,
  createEvent,
} = require("../controllers/eventController");

// get all events
router.get("/", getEvents);

// get event by ID
router.get("/:id", getEventById);

//create event
router.post("/", createEvent);

module.exports = router;
