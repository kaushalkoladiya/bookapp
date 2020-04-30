import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import BookList from './components/BookList/BookList';
import AddBook from './components/AddBook/AddBook';

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql"
})

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="main">
        <BookList />
        <AddBook />
      </div>
    </ApolloProvider>
  );
}

export default App;
