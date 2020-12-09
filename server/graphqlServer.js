const { ApolloServer, gql } = require("apollo-server-koa");

const typeDefs = gql`
  type User {
    id: Int!
    name: String!
    email: String!
    job_title: String!
    team: String!
  }

  type Query {
    users: [User]
  }
`;

const resolvers = {
  Query: {
    users: async (root, args, context) => {
      console.log(root);
      console.log(args);
      console.log(context);
      console.log("#####");

      return [{
        id: 1,
        name: "홍길동",
        email: "hgd@lge.com",
        job_title: "연구원",
        team: "IDDX Task",
      }];
    },
  },
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

module.exports = {
  apolloServer,
};
