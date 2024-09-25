const db = require("../../db");

//get all organizers
const getOrganizers = (req, res) => {
  const query = "SELECT * FROM organizers";

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ organizers: results });
  });
};

module.exports = { getOrganizers };
