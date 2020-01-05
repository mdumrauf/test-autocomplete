import React, { Component, Fragment } from 'react';
import {withRouter} from 'react-router-dom';

class Book extends Component {

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
    } = this.props.match

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

    return <Fragment>
      <h1>Title: {title}</h1>
      <h2>{subtitle}</h2>
      <div>{briefDescription}</div>
      <img alt={briefDescription} width="100" src={`../${thumbnail}`}></img>
      <ul>
        <li><a href={url}><em>Buy!</em></a></li>
        <li><b>Description</b>: {description}</li>
        <li><b>Edition</b>: {edition}</li>
        <li><b>Price</b>: ${price}</li>
        <li><b>Primary</b> category: {primaryCategory}</li>
        <li><b>Subcategories</b>: {subCategories}</li>
        <li><b>Attribution</b>: {attribution}</li>
        <li><b>Chapterprice</b>: {chapterPrice}</li>
        <li><b>Publisher</b>: {publisher}</li>
        <li><b>Copyright year</b>: {copyrightYear}</li>
      </ul>
      <button onClick={navigateBack}>Back</button>
    </Fragment>
  }

}

export default withRouter(Book);
