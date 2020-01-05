const http = require('http');
const url = require('url')

const {findAll} = require('./books');
const books = findAll();

const PAGE_SIZE = 50;

function send404(res) {
  res.statusCode = 404;
  res.end();
}

function filterBooks(start, end) {
  return books.data.slice(start, end);
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
      start
    }
  } = theURL;

  if (pathname !== '/api/books') {
    send404(res);
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
  const result = filterBooks(offset, end);
  const moreResults = end < books.data.length;

  res.writeHead(200, {
    'Content-Type': 'application/json',
  });
  res.end(JSON.stringify({
    info: {
      paging: {
        count: result.length,
        total: books.data.length,
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
