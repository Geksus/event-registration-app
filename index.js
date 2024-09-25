const express = require("express");
const bodyParser = require("body-parser");
const eventRoutes = require("./back/routes/eventRoutes");
const participantRoutes = require("./back/routes/participantRoutes");
const organizersRoutes = require("./back/routes/organizersRoutes");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || "5000";

app.use(cors());

app.use(bodyParser.json());

app.use("/api", eventRoutes);
app.use("/api", participantRoutes);
app.use("/api", organizersRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
