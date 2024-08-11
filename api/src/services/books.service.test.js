const service = require("./books.service");

const fakeBooks = [
  {
    id: "1",
    title: "Book 1",
  },
  {
    id: "2",
    title: "Book 2",
  },
  {
    id: "3",
    title: "Book 3",
  },
];

const MongoLibStub = {
  getAll: () => [...fakeBooks],
  create: () => {},
};

jest.mock("../lib/mongo.lib", () =>
  jest.fn().mockImplementation(() => MongoLibStub)
);

describe("Test for books service", () => {
  let BooksService;

  //Arrange
  beforeEach(() => {
    BooksService = new service();
    jest.clearAllMocks();
  });
  //Act

  test("should return an array of books", async () => {
    const books = await BooksService.getBooks();
    console.log(books);
    expect(books.length).toEqual(1);
  });
  //Assert
});
