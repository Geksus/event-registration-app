const db = require("../../db");

// get events per page
const getEvents = (req, res) => {
  const query = "SELECT * FROM events";
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ events: results });
  });
};

// get event by id
const getEventById = (req, res) => {
  const event_id = req.params.event_id;

  const query = "SELECT * FROM events WHERE id = ?";
  db.query(query, [event_id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json(result[0]);
  });
};

// create event
const createEvent = (req, res) => {
  const { title, description, event_date, organizer_id } = req.body;

  const query =
    "INSERT INTO events (id, title, description, event_date, organizer_id) VALUES (UUID(), ?, ?, ?, ?)";

  db.query(
    query,
    [title, description, event_date, organizer_id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res
        .status(201)
        .json({ message: "Event created", event_id: result.insertId });
    },
  );
};

module.exports = { getEvents, getEventById, createEvent };
