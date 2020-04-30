const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull } = require('graphql');
const Author = require('../model/Author');
const Book = require('../model/Book');

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve: async ({ authorId }, args) => {
        if (!authorId) { return; }
        return { _doc } = await Author.findById(authorId);
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve: async ({ _id }, args) => {
        if (!_id) { return; }
        return { _doc } = await Book.find({ authorId: _id });
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    book: {
      type: BookType,
      args: { _id: { type: GraphQLID } },
      resolve: async (parent, { _id }) => {
        if (!_id) { return; }
        return { _doc } = await Book.findById(_id);
      }
    },
    author: {
      type: AuthorType,
      args: { _id: { type: GraphQLID } },
      resolve: async (parent, { _id }) => {
        if (!_id) { return; }
        return { _doc } = await Author.findById(_id);
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve: async (parent, args) => {
        return await Book.find();
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve: async (parent, args) => {
        return await Author.find();
      }
    }
  }
});

const MutationQuery = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve: async (parent, { name, age }) => {
        const author = await Author.create({
          name,
          age
        });
        if (!author) {
          return;
        }
        return author._doc;
      }
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve: async (parent, { name, genre, authorId }) => {
        if (!name || !genre || !authorId) {
          return {
            data: 'Unauthorized'
          };
        }
        const book = await Book.create({
          name,
          genre,
          authorId
        });
        return book._doc;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: MutationQuery
});