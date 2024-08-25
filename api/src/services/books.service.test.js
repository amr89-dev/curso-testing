const { genertaManyBooks, generateOneBook } = require("../dataFake/books.fake");
const service = require("./books.service");
/* 
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
]; */

//👇🏽 Esto es un espia y se puede usar para hacer pruebas de caja blanca
const mockSpyGetAll = jest.fn();

/*  Estos son los servicios "fake" que se le pasaran al mock de mas abajo, podemos elegir los metodos que querramos probar
const MongoLibStub = {
  getAll: () => [...fakeBooks],
  create: () => {},
}; */

const MongoLibStub = {
  getAll: mockSpyGetAll, // 👈🏽 De esta manera se le pasa directamente el espia al metodo
  create: () => {},
};

/* //👇🏽Esta es la manera de "mockear" o suplantar los servicios que en este caso traen información de la base de datos
jest.mock("../lib/mongo.lib", () =>
  jest.fn().mockImplementation(() => MongoLibStub)
); */

jest.mock("../lib/mongo.lib", () =>
  jest.fn().mockImplementation(() => ({
    getAll: mockSpyGetAll,
    create: () => {},
  }))
);

describe("Test for books service", () => {
  let BooksService;

  //Arrange
  beforeEach(() => {
    BooksService = new service();
    jest.clearAllMocks(); //👈🏽 Esto se usa para que cada vez que se ejecuta un test se limpia el estado
  });
  //Act

  describe("test fot getAll", () => {
    test("should return an array of books", async () => {
      //Arrange

      const fakeBooks = genertaManyBooks(5);

      mockSpyGetAll.mockResolvedValue(fakeBooks);
      //Act
      const books = await BooksService.getBooks({});
      console.log(books);
      //Assert
      expect(books.length).toEqual(fakeBooks.length);
      expect(mockSpyGetAll).toHaveBeenCalled();
      expect(mockSpyGetAll).toHaveBeenCalledTimes(1);
      expect(mockSpyGetAll).toHaveBeenCalledWith("books", {});
    });
    test("should return a name of the book", async () => {
      //Arrange
      const book = generateOneBook();
      mockSpyGetAll.mockResolvedValue(book);

      //Act
      const books = await BooksService.getBooks();
      console.log({ books, book });
      //Assert
      expect(books.title).toEqual(book.title);
    });
  });
  //Assert
});
