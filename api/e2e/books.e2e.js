const request = require("supertest");
const { MongoClient } = require("mongodb");
const createApp = require("../src/app");
const MONGO_URI = process.env.MONGO_URL;
const MONGO_DB_NAME = process.env.MONGO_DB_NAME;

describe("Test for books endopoint", () => {
  let app = null;
  let server = null;
  let database = null;
  beforeAll(async () => {
    app = createApp();
    server = app.listen(3001);
    const client = new MongoClient(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();
    database = client.db(MONGO_DB_NAME);
  });

  afterAll(async () => {
    await server.close();
    await database.dropCollection("books");
  });

  describe("Test for [GET] /api/v1/books", () => {
    test("should return a list book", async () => {
      const seed = [
        {
          title: "Book 1",
        },
        {
          title: "Book 2",
        },
        {
          title: "Book 3",
        },
      ];
      const insertedBooks = await database.collection("books").insertMany(seed);
      console.log(insertedBooks);
      return request(app)
        .get("/api/v1/books")
        .expect(200)
        .then(({ body }) => {
          console.log(body);
          expect(body.length).toEqual(insertedBooks.insertedCount);
        });
    });
  });
});
