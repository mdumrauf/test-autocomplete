const http = require('http');
const url = require('url')
const {filter, includes, isEmpty, split, startsWith, toLower} = require('lodash');

const BooksRepository = require('./booksRepository');
const books = BooksRepository.findAll();

const PAGE_SIZE = 50;

function send404(res) {
  res.statusCode = 404;
  res.end();
}

function filterBooks(books, query) {
  return filter(books.data, (book) => includes(toLower(book.title), toLower(query)));
}

const server = http.createServer((req, res) => {
  if (req.method !== 'GET') {
    send404(res);
    return;
  }

  const theURL = url.parse(req.url, true);
  const {
    pathname,
    query: {
      count,
      query,
      start
    }
  } = theURL;

  if (!startsWith(pathname, '/api/books')) {
    send404(res);
    return;
  }

  const bookId = split(pathname, '/api/books/')[1];

  if (!isEmpty(bookId)) {
    const book = BooksRepository.findById(bookId);

    if (isEmpty(book)) {
      send404(res);
      return;
    }
    res.writeHead(200, {
      'Content-Type': 'application/json',
    });
    res.end(JSON.stringify(book));
    return;
  }

  const size = Number.parseInt(count, 10) || PAGE_SIZE;
  if (size < 0 || size > PAGE_SIZE) {
    res.writeHead(400, {
      'Content-Type': 'application/json',
    });
    res.end(JSON.stringify({
    info: {},
    status: {
      statusMsg: `Value of count must be a positive integer less than ${PAGE_SIZE}; got '${count}'.`,
      statusDetails: {},
      statusCode: 'InvalidRequest'
    },
    result: null,
  }));
    return;
  }

  const offset = Number.parseInt(start, 10) || 0;
  const end = offset + size;
  const filtered = filterBooks(books, query);
  const result = filtered.slice(start, end)
  const moreResults = end < filtered.length;

  res.writeHead(200, {
    'Content-Type': 'application/json',
  });
  res.end(JSON.stringify({
    info: {
      paging: {
        count: result.length,
        total: filtered.length,
        pageNext: moreResults ? end : undefined,
        moreResults,
      },
    },
    status: {
      statusMsg: 'Ok',
      statusDetails: {},
      statusCode: 'HTTPOk'
    },
    result,
  }));
});

module.exports = server;
