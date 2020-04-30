import React from 'react';
import { graphql } from 'react-apollo'
import { getBook } from '../../api';

const BookDetail = (props) => {
  const book = props?.data?.book;
  const data = book && (
    <div className="book-detail">
      <h1>Selected book detail</h1>
      <h2>Book name: {book.name}</h2>
      <h4>Genre: {book.genre}</h4>
      <p>Author: {book.author.name}</p>
      <p>Author age: {book.author.age}</p>
      <p>All books by this Author</p>
      <ul>
        {book.author.books.map((book, key) => {
          return (
            <li key={key}>{book.name}</li>
          )
        })}
      </ul>
    </div>
  );
  return (
    props.bookId && (
      <div>
        {data}
      </div>
    )
  );
}

export default graphql(getBook, {
  options: (props) => {
    return {
      variables: {
        _id: props.bookId
      }
    }
  }
})(BookDetail);