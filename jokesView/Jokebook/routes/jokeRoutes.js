const express = require("express");
const router = express.Router();
const {
  getJokesByCategory,
  addJoke,
  getRandomJoke,
} = require("../controllers/jokeController");

router.get("/joke/:category", getJokesByCategory);
router.post("/joke/new", addJoke);
router.get("/randomJoke", getRandomJoke);

module.exports = router;
