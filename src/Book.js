import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {withRouter} from 'react-router-dom';

import './Book.css';

class Book extends Component {

  static propTypes = {
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      book: {},
    };
    this.navigateBack = this.navigateBack.bind(this);
  }

  componentDidMount = async () => {
    const {
      params: {
        id
      }
    } = this.props.match;

    const response = await fetch(`/api/books/${id}`);
    const result = await response.json();

    this.setState({
      book: result
    });
  }

  navigateBack() {
    this.props.history.goBack();
  }

  render() {
    const {
      navigateBack,
      state: {
        book: {
          copyrightYear,
          subtitle,
          edition,
          briefDescription,
          primaryCategory,
          subCategories,
          title,
          thumbnail,
          attribution,
          description,
          price,
          chapterPrice,
          publisher,
          url
        }
      }
    } = this;

    return (
      <div className="book">
        <h1>{title}</h1>
        <h2>{subtitle}</h2>
        <div className="column">
            {briefDescription}
          </div>
        <div className="row">
          <div className="column">
            <img alt={briefDescription} width="150" src={`../${thumbnail}`}></img>
          </div>
          <div className="column">
            {description}
          </div>
        </div>
        <ul>
          <li><a href={url}><em>Buy!</em></a></li>
          <li><b>Edition</b>: {edition}</li>
          <li><b>Price</b>: ${price}</li>
          <li><b>Primary category</b>: {primaryCategory}</li>
          <li><b>Subcategories</b>: {subCategories}</li>
          <li><b>Attribution</b>: {attribution}</li>
          <li><b>Chapterprice</b>: {chapterPrice}</li>
          <li><b>Publisher</b>: {publisher}</li>
          <li><b>Copyright year</b>: {copyrightYear}</li>
        </ul>
        <button className="back-button" onClick={navigateBack}>Back</button>
      </div>
    );
  }

}

export default withRouter(Book);
