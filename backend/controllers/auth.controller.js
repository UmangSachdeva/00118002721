// Here we define a middle ware to authenticate the user before any request

const catchAsync = require("../utils/catchAsync");
const axios = require("axios");

const CLIENT_SECRET = process.env.CLIENT_SECRET;
const CLIENT_TOKEN = process.env.CLIENT_TOKEN;

exports.authenticate = catchAsync(async (req, res, next) => {
  const auth_url = process.env.AUTH_URL;

  const response = await axios.post(auth_url, {
    companyName: process.env.COMPANY_NAME,
    clientID: CLIENT_TOKEN,
    clientSecret: CLIENT_SECRET,
    ownerName: process.env.OWNER_NAME,
    ownerEmail: process.env.OWNER_EMAIL,
    rollNo: process.env.ROLL_NO,
  });

  req.tokens = response.data;
  next();
});
