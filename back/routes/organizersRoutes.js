const express = require("express");
const router = express.Router();

const { getOrganizers } = require("../controllers/organizersController");

// get all organizers
router.get("/organizers", getOrganizers);

module.exports = router;
