const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const categoryRoutes = require("./routes/categoryRoutes");
const jokeRoutes = require("./routes/jokeRoutes");

// Enable CORS for all routes
app.use(cors());

app.use(bodyParser.json());
app.use("/jokebook", categoryRoutes);
app.use("/jokebook", jokeRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
