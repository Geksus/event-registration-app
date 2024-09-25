const db = require("../../db");

// get events per page
const getEvents = (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const page = parseInt(req.query.page) || 1;
  const offset = (page - 1) * limit;

  const query = "SELECT * FROM events LIMIT ?, ?";
  db.query(query, [offset, limit], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ events: results });
    console.log("Events fetched successfully", results);
  });
};

// get event by id
const getEventById = (req, res) => {
  const eventId = req.params.id;

  const query = "SELECT * FROM events WHERE id = ?";
  db.query(query, [eventId], (err, result) => {
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
  const { title, description, event_date, organizer_id } = req.body();

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
        .json({ message: "Event created", eventId: result.insertId });
    },
  );
};

module.exports = { getEvents, getEventById, createEvent };
