const request = require("supertest");
const mockSpyGetAll = jest.fn();
const createApp = require("../src/app");
const { genertaManyBooks } = require("../src/dataFake/books.fake");

jest.mock("../src/lib/mongo.lib.js", () =>
  jest.fn().mockImplementation(() => ({
    getAll: mockSpyGetAll,
    create: () => {},
  }))
);

describe("Test for books endopoint", () => {
  let app = null;
  let server = null;
  beforeAll(() => {
    app = createApp();
    server = app.listen(3001);
  });

  afterAll(async () => {
    await server.close();
  });

  describe("Test for [GET] /api/v1/books", () => {
    test("should return a list book", () => {
      const fakeBooks = genertaManyBooks(5);

      mockSpyGetAll.mockResolvedValue(fakeBooks);
      return request(app)
        .get("/api/v1/books")
        .expect(200)
        .then(({ body }) => {
          console.log(body);
          expect(body.length).toEqual(fakeBooks.length);
        });
    });
  });
});
