const express = require("express");
const router = express.Router();
const {
  getCategories,
  addCategory,
} = require("../controllers/categoryController");

router.get("/categories", getCategories);
router.post("/category/new", addCategory);

module.exports = router;
