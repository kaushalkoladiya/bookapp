import { gql } from 'apollo-boost';

export const getAuthors = gql`
{
  authors{
    name
    _id
  }
}
`

export const getBooks = gql`
{
  books{
    name
    _id
  }
}
`;

export const addBook = gql`
  mutation($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      _id

    }
  }
`;

export const getBook = gql`
  query($_id: ID!){
    book(_id: $_id) {
      _id
      name
      genre
      _id
      author {
        name
        age
        books {
          name
          _id
        }
      }
    }
  }
`;