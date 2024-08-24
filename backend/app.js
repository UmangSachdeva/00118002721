const express = require("express");
const cors = require("cors");

const productRoutes = require("./routes/products.route");
const authController = require("./controllers/auth.controller");
const app = express();

// Allow cors policy headers
app.use(
  cors({
    origin: [],
    credentials: true,
    optionSuccessStatus: 200,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);

// Body parser - limit the body size
app.use(express.json({ limit: "5mb" }));

// Middleware to authenticate all the request
app.use(authController.authenticate);

app.use("/api/v1/product", productRoutes);

module.exports = app;
