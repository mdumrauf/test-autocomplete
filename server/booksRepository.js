const {find} = require('lodash');
const {findAll} = require('./books');

class BooksRepository {

  static findById(id) {
    return find(this.findAll().data, (book) => book.id === id);
  }

  static findAll() {
    return findAll();
  }

}

module.exports = BooksRepository;
