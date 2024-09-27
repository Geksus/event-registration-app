const db = require("../../db");

// register a participant
const registerParticipant = (req, res) => {
  const { full_name, email, date_of_birth, referral_source, event_id } =
    req.body;
  const query = `INSERT INTO participants (id, full_name, email, date_of_birth, referral_source, event_id) VALUES (UUID(), ?, ?, ?, ?, ?)`;
  db.query(
    query,
    [full_name, email, date_of_birth, referral_source, event_id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({
        message: "Participant registered",
        participantId: result.insertId,
      });
    },
  );
};

// get event participants
const getParticipants = (req, res) => {
  const event_id = req.params.event_id;
  const query = `SELECT * FROM participants WHERE event_id = ?`;
  db.query(query, [event_id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ participants: results });
  });
};

module.exports = { registerParticipant, getParticipants };
