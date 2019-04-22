const { gql, ApolloServer } = require('apollo-server');
const { find, filter } = require('lodash');

const typedefs = gql`
  type Book {
    title: String
    author: Author
  }

  type Author {
    books: [Book]
  }

  type Query {
    author: Author
  }
`;

const resolvers = {
  Query: {
    author(parent, args, context, info) {
      return find(authors, { id: args.id });
    },
  },
  Author: {
    books(author) {
      return filter(books, { author: author.name });
    },
  },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`)
  });