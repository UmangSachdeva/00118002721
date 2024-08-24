const express = require("express");
const cors = require("cors");

const productRoutes = require("./routes/products.route");
const authController = require("./controllers/auth.controller");
const app = express();

// Allow cors policy headers
app.use(cors());

// Body parser - limit the body size
app.use(express.json({ limit: "5mb" }));

// Middleware to authenticate all the request
app.use(authController.authenticate);

app.use("/api/v1", productRoutes);

module.exports = app;
