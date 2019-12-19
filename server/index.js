const http = require('http');
const url = require('url')

const books = require('./books.js');

const PAGE_SIZE = 50;

function send404(res) {
  res.statusCode = 404;
  res.end();
}

const server = http.createServer((req, res) => {
  if (req.method !== 'GET') {
    send404(res);
    return;
  }

  const theURL = url.parse(req.url, true);
  if (theURL.pathname !== '/api/books') {
    send404(res);
    return;
  }

  const count = Number.parseInt(theURL.query && theURL.query.count, 10) || PAGE_SIZE;
  if (count < 0 || count > PAGE_SIZE) {
    res.statusCode = 400;
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

  const start = Number.parseInt(theURL.query && theURL.query.start, 10) || 0;
  const end = start + count;
  const result = books.data.slice(start, end);
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

server.listen(4000, () => {
  console.log('Server is running');
});
