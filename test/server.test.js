const request = require('supertest')
let app;

const {
  book95,
  booksResponse,
  booksResponseWithOffset,
  booksResponseFilteredByQuery,
 } = require('./fixtures');

jest.mock('../server/books', () => ({
  findAll: jest.fn().mockImplementation(() => {
    return require('./fixtures/books');
  })
}));

beforeAll(() => {
  app = require('../server/server');
})

afterEach(() => {
  jest.clearAllMocks();
})

describe('/api/books', () => {

  it('should return 200 OK with no params', async (done) => {
    const response = await request(app).get('/api/books');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(booksResponse);

    done();
  });

  it('should return 200 OK with start param equal to half of the total count', async (done) => {
    const response = await request(app).get('/api/books?start=50');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(booksResponseWithOffset);

    done();
  });

  it('should return 200 OK when filtr query param is included', async (done) => {
    const response = await request(app).get('/api/books?query=econo');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(booksResponseFilteredByQuery);

    done();
  });

  it('should return 400 BAD REQUEST with invalid params', async (done) => {
    const response = await request(app).get('/api/books?count=-10');

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      info: {},
      status: {
        statusMsg: `Value of count must be a positive integer less than 50; got '-10'.`,
        statusDetails: {},
        statusCode: 'InvalidRequest'
      },
      result: null,
    });

    done();
  });

  it('should return 404 NOT FOUND when call with verb other than GET', async (done) => {
    const response = await request(app).post('/api/books');

    expect(response.status).toBe(404);

    done();
  });

  it('should return 404 NOT FOUND with non-existent route ', async (done) => {
    const response = await request(app).get('/api/foo');

    expect(response.status).toBe(404);

    done();
  });

});

describe('/api/books/:id', () => {

  it('should return 200 OK with existent book ', async (done) => {
    const response = await request(app).get('/api/books/book-id-95');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(book95);

    done();
  });

  it('should return 404 NOT FOUND with non-existent book ', async (done) => {
    const response = await request(app).get('/api/books/42');

    expect(response.status).toBe(404);

    done();
  });

});
