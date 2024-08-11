const service = require("./books.service");

describe("Test for books service", () => {
  let BooksService;

  //Arrange
  beforeEach(() => {
    BooksService = new service();
  });
  //Act

  test("should return an array of books", async () => {
    const books = await BooksService.getBooks({});
    expect(books.length).toEqual(2);
  });
  //Assert
});
