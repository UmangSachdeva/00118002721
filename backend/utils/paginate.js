const shortId = require("shortid");

const makeId = (item) => {
  console.log(item);
  // Generate a short ID using the shortid library
  const shortid = shortId.generate();

  // Combine the company name and short ID to create a unique ID
  //   if there is a space add a - to it
  return `${item.productName.replace(" ", "")}/${item.price}`;
};

const paginate = (items, size, page) => {
  const start = (page - 1) * Number(size);
  const end = Number(start) + Number(size);

  console.log(start, end);
  return items.slice(start, end);
};
const sortItems = (items, key, dir) => {
  return items.sort((first, second) => {
    if (dir === "asc") {
      return first[key] > second[key] ? 1 : -1;
    } else {
      return first[key] < second[key] ? 1 : -1;
    }
  });
};
module.exports = { makeId, sortItems, paginate };
