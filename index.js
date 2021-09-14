const { ApolloServer, gql } = require('apollo-server');

const IDL = require("./idl.json");

const typeDefs = gql`
  type Book {
    title: String
    author: String
  }
  type Metadata {
      address: String
  }

  type IdlAccs = {
      
  }

  type IdlAcc {
      name: String,
      isMut: Boolean,
      isSigner: Boolean
  }

  type IdlField { 
      name: String,
      type: String
  }

  type IdlIx {
      name: String,
      accounts: [IdlAcc]
      args: [IdlField]
  }

  type Program {
      version: String,
      name: String,
      instruction: [IdlIx],
      accounts: [IdlAcc],
      metadata: Metadata
  }

  type Query {
    program: Program
  }
`;

const resolvers = {
    Query: {
        program: () => IDL
    },
    Program: {
        instruction: (parent, args, ctx) => parent.instructions,
        accounts: (parent, args, ctx) => parent.accounts
    },
    IdlIx: {
        accounts: (parent, args, ctx) => parent.accounts,
        args: (parent, args, ctx) => parent.args
    }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});