import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import { getBooks } from '../../api';
import BookDetail from '../BookDetail/BookDetail';


class Booklist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null
    }
  }

  render() {
    return (
      <div className="book-list">
        {
          this.props.data.loading ? (<h3>loading...</h3>
          ) : (
              this.props.data.books.map((book, key) => (
                <li key={key} className="li" onClick={e => this.setState({ selected: book._id })}>{book.name}</li>
              ))
            )
        }
        <BookDetail
          bookId={this.state.selected}
        />
      </div>
    )
  }

}
export default graphql(getBooks)(Booklist);