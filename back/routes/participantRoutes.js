const express = require("express");
const router = express.Router();
const {
  registerParticipant,
  getParticipants,
} = require("../controllers/participantController");

// Register a participant for an event
router.post("/:event_id/register", registerParticipant);

// Get participants for an event
router.get("/:event_id/participants", getParticipants);

module.exports = router;
