const express = require("express");
const router = express.Router();
const {
  registerParticipant,
  getParticipants,
} = require("../controllers/participantController");

// register participant
router.post(":eventId/register", registerParticipant);

// get event participants
router.get(":eventId/participants", getParticipants);

module.exports = router;
