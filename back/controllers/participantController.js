const db = require("../../db");

// register a participant
const registerParticipant = (req, res) => {
  const eventId = req.params.eventId;
  const { full_name, email, date_of_birth, referral_source } = req.body;

  const query = `INSERT INTO participants (id, full_name, email, date_of_birth, referral_source, event_id) VALUES (UUID(), ?, ?, ?, ?, ?)`;
  db.query(
    query,
    [full_name, email, date_of_birth, referral_source, eventId],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res
        .status(201)
        .json({
          message: "Participant registered",
          participantId: result.insertId,
        });
    },
  );
};

// get event participants
const getParticipants = (req, res) => {
  const eventId = req.params.eventId;

  const query = `SELECT * FROM participants WHERE event_id = ?`;
  db.query(query, [eventId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ participants: results });
  });
};

module.exports = { registerParticipant, getParticipants };
