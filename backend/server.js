const dotenv = require("dotenv");

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED REJECTION ☠️  SHUTTING DOWN.....");

  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION ☠️  SHUTTING DOWN.....");
  console.log(err.message);

  process.exit(1);
});

dotenv.config({
  path: "./config.env",
});

const app = require("./app");

const port = process.env.PORT;
app.listen(port, () => {
  console.log("App running on port " + port);
});
