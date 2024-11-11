const Joke = require("../models/joke");
const Category = require("../models/category");
const sequelize = require("../config/database");
const { default: axios } = require("axios");

exports.getJokesByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const limit = parseInt(req.query.limit) || null;

    const categoryInstance = await Category.findOne({
      where: { name: category },
    });
    if (!categoryInstance) {
      try {
        const response = await axios.get(
          `https://v2.jokeapi.dev/joke/${category}?type=twopart&amount=3&blacklistFlags=nsfw,religious,political,racist,sexist,explicit`
        );
        if (response?.data?.jokes) {
          const name = req.params.category;
          const externalCategory = await Category.create({ name: name });
          console.log("Created category:", categoryInstance);
          const jokesToSave = response.data.jokes.map((joke) => ({
            category_id: externalCategory.id,
            setup: joke.setup,
            delivery: joke.delivery,
          }));

          // Bulk create jokes in the database
          await Joke.bulkCreate(jokesToSave);
          return res
            .status(200)
            .json({ error: null, data: response?.data?.jokes });
        } else {
          console.log(error);
          return res.status(200).json({ error: "Category not found" });
        }
      } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Category not found" });
      }
    }

    const jokes = await Joke.findAll({
      where: { category_id: categoryInstance.id },
      limit: limit,
    });
    if (jokes.length === 0)
      return res.status(200).json({ error: "No jokes found" });
    res.json({ error: null, data: jokes });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error fetching jokes" });
  }
};

exports.addJoke = async (req, res) => {
  try {
    const { category, setup, delivery } = req.body;
    if (!category || !setup || !delivery)
      return res.status(200).json({ error: "All fields required" });

    const categoryInstance = await Category.findOne({
      where: { name: category },
    });
    if (!categoryInstance)
      categoryInstance = await Category.create({ name: category });

    const joke = await Joke.create({
      category_id: categoryInstance.id,
      setup,
      delivery,
    });

    res.status(200).json({ error: null, data: joke });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error creating joke" });
  }
};

exports.getRandomJoke = async (req, res) => {
  try {
    const joke = await Joke.findOne({
      order: sequelize.random(),
    });

    if (!joke) {
      return res.status(200).json({ error: "No jokes found" });
    }

    res.json({ error: null, data: joke });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error fetching random joke" });
  }
};
