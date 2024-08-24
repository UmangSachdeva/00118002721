const express = require("express");
const router = express.Router();
const productController = require("../controllers/products.controller");

router.route("/:category/products").get(productController.getTopProducts);

module.exports = router;
