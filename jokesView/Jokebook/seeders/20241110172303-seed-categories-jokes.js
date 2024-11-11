const Category = require("../models/category");
const Joke = require("../models/joke");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Array of categories
    const categories = ["Tech"];

    // Loop through each category and add 3 jokes
    for (const categoryName of categories) {
      // Check if category already exists
      const category = await Category.findOne({
        where: { name: categoryName },
      });

      // If category doesn't exist, create it
      if (!category) {
        const newCategory = await Category.create({ name: categoryName });

        // Create 3 jokes for the new category
        const jokes = [
          {
            setup: `Why do programmers prefer dark mode?`,
            delivery: `Because light attracts bugs.`,
          },
          {
            setup: `Why do Java developers wear glasses?`,
            delivery: `Because they can't C#.`,
          },
          {
            setup: `What’s the object-oriented way to become wealthy?`,
            delivery: `Inheritance.`,
          },
        ];

        // Add jokes to the category
        for (let joke of jokes) {
          await Joke.create({
            category_id: newCategory.id,
            setup: joke.setup,
            delivery: joke.delivery,
          });
        }
      }
    }
  },

  down: async (queryInterface, Sequelize) => {
    // You can add logic to reverse the seed if needed
    await Category.destroy({ where: {}, truncate: true });
    await Joke.destroy({ where: {}, truncate: true });
  },
};
