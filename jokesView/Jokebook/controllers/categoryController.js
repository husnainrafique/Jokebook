const Category = require("../models/category");

exports.getCategories = async (req, res) => {
  try {
    const { search } = req.query;
    let categories;
    if (search) {
      categories = await Category.findAll({
        where: {
          name: {
            [Op.like]: `%${search}%`,
          },
        },
      });
    } else {
      categories = await Category.findAll();
    }

    res.json({ error: null, data: categories });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error fetching categories" });
  }
};

exports.addCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name)
      return res.status(200).json({ error: "Category name is required" });

    // Check if category already exists
    const existingCategory = await Category.findOne({ where: { name } });
    if (existingCategory)
      return res.status(200).json({ error: "Category already exists" });

    const category = await Category.create({ name });
    const data = category.toJSON();
    return res.status(200).json({ error: null, data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error adding category" });
  }
};
