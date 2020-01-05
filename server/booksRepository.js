const {findAll} = require('./books');

class BooksRepository {

  static findAll() {
    return findAll();
  }

}

module.exports = BooksRepository;
