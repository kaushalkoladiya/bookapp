import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';

import { getAuthors, addBook, getBooks } from '../../api';
import Input from '../Input/Input';

class authorList extends Component {

  state = {
    name: '',
    genre: '',
    authorId: ''
  }

  onInputChangeHandler = (inputId, value) => {
    this.setState({ [inputId]: value });
  }

  onSelectChangeHandler = (value) => {
    this.setState({ authorId: value });
  }

  onSubmitHandler = () => {
    this.props.addBook({
      variables: {
        name: this.state.name,
        genre: this.state.genre,
        authorId: this.state.authorId,
      },
      refetchQueries: [{
        query: getBooks
      }]
    });
  }

  render() {
    return (
      <div className="form">
        <Input
          id="name"
          label="Book Name"
          name="name"
          value={this.state.name}
          placeholder="Enter Book name"
          onChange={this.onInputChangeHandler}
        />
        <Input
          id="genre"
          label="Genre Name"
          name="genre"
          placeholder="Enter Genre name"
          value={this.state.genre}
          onChange={this.onInputChangeHandler}
        />
        <div className="field">
          <label>Author</label>
          <select onChange={e => this.onSelectChangeHandler(e.target.value)}>
            {!this.props.getAuthors.loading && (
              this.props.getAuthors.authors.map((author, key) => (
                <option key={key} value={author._id}>{author.name}</option>
              ))
            )}
          </select>
        </div>
        <button onClick={this.onSubmitHandler}>+</button>
      </div>
    )
  }

}

export default compose(
  graphql(getAuthors, { name: "getAuthors" }),
  graphql(addBook, { name: "addBook" })
)(authorList);