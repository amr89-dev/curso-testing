const { faker } = require("@faker-js/faker");

const generateOneBook = () => ({
  _id: faker.string.uuid(),
  title: faker.commerce.productName(),
  price: faker.commerce.price(),
});

const genertaManyBooks = (size) => {
  const limit = size ?? 10;
  const books = [];

  for (let index = 0; index < limit; index++) {
    books.push(generateOneBook());
  }

  return books;
};

module.exports = { generateOneBook, genertaManyBooks };
