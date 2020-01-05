const request = require('supertest')
let app;

const booksResponse = require('./booksResponse');

jest.mock('../server/books', () => ({
  findAll: jest.fn().mockImplementation(() => {
    return require('./booksFixture');
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

});