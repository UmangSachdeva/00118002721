// This controller contains all the function for the products

const catchAsync = require("../utils/catchAsync");
const { paginate, makeId } = require("../utils/paginate");
const axios = require("axios");

const cmpList = ["AMZ", "FLP", "SNP", "MYN", "AZO"];

// Fetching products from the API

// Not using the apiError wrapper because we don't want to show the error
const fetchProducts = async (cmp, cat, token, n, minPrice, maxPrice) => {
  // Constructing a query String
  const queryString = new URLSearchParams({
    top: n,
    minPrice,
    maxPrice,
  });

  try {
    const res = await axios.get(
      `${process.env.API_URL}/${cmp}/categories/${cat}/products?${queryString}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    // cheching if we have the data and validating the result is an array
    // If not then return the empty array
    if (res && res.data) {
      return res.data;
    } else {
      console.error(`Unexpected response from ${cmp}:`, res.data);
      return [];
    }
  } catch (err) {
    console.error(`Failed to fetch from ${cmp}: ${err.message}`);
    return [];
  }
};

exports.getTopProducts = catchAsync(async (req, res) => {
  const { category } = req.params;
  //   Defining the default values as well while destructuring
  const {
    n = 10,
    page = 1,
    sort,
    order = "asc",
    minPrice = 1,
    maxPrice = 10000,
  } = req.query;

  const responses = await Promise.all(
    cmpList.map((compy) =>
      fetchProducts(
        compy,
        category,
        req.tokens.access_token,
        n,
        minPrice,
        maxPrice
      )
    )
  );

  //   make the array flat
  let prods = responses.flat();

  if (prods.length === 0) {
    console.warn("No products found.");
  }

  //   Add a custom Id to the products
  prods = prods.map((p) => ({
    ...p,
    id: makeId(p),
  }));

  if (sort) {
    prods = sortItems(prods, sort, order);
  }

  //   Use the flat array to paginate
  const paginated = paginate(prods, n, page);

  res.status(200).json({
    status: "success",
    page: page,
    total: prods.length,
    data: paginated,
  });
});
