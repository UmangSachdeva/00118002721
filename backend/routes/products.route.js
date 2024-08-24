const express = require("express");
const router = express.Router();
const productController = require("../controllers/products.controller");

router
  .route("/categories/:categoryname/products")
  .get(productController.getTopProducts);

router
  .route("/categories/:categoryname/products/:productid")
  .get(productController.getDetails);

module.exports = router;
