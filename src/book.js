import React, { Component, Fragment } from 'react';

class Book extends Component {

  constructor(props) {
    super(props);
    this.state = {
      book: {},
    };
  }

  componentDidMount = async () => {
    const {
      params: {
        id
      }
    } = this.props.match
  }

  render() {

    return <Fragment>
      <h1>Title: Book</h1>
    </Fragment>
  }

}

export default Book;
