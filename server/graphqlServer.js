const { ApolloServer, gql } = require("apollo-server-koa");

const typeDefs = gql`
  type User {
    id: Int!
    name: String!
    email: String!
    job_title: String!
    team: String!
    teammate: [User]!
  }

  input UserInput {
    id: Int
    name: String!
    email: String!
    job_title: String!
    team: String!
  }

  type Query {
    users: [User]
    user(id: Int): User
  }

  type Mutation {
    addUser(user: UserInput): User
    updateUser(user: UserInput): User
    deleteUser(id: Int): Int
  }
`;

const users = [
  {
    id: 1,
    name: "홍길동",
    email: "hgd@lge.com",
    job_title: "연구원",
    team: "IDDX Task",
  },
  {
    id: 2,
    name: "임꺽정",
    email: "ygj@lge.com",
    job_title: "선임 연구원",
    team: "IDDX Task",
  },
];
let userIndex = 1;

const resolvers = {
  Query: {
    users: async (root, args, context) => {
      console.log(root);
      console.log(args);
      console.log(context);
      console.log("#####");
      console.log(users);

      return users;
    },
    user: async (root, {id}, context) => {
      return users.find(d => d.id === id);
    }
  },
  Mutation: {
    addUser: async (root, { user }) => {
      const newUser = {
        id: ++userIndex,
        ...user,
      };
      users.push(newUser);
      console.log(users);
      return newUser;
    },
    updateUser: async (root, { user }) => {
      console.log(user);
      const index = users.findIndex((d) => d.id === user.id);
      const updateUser = {
        ...users[index],
        ...user,
      };
      users[index] = updateUser;
      console.log(users);

      return updateUser;
    },
    deleteUser: async (root, { id }) => {
      const index = users.findIndex((d) => d.id === id);
      users.splice(index, 1);
      console.log(users);

      return id;
    },
  },
  User: {
    teammate: ({ id, team }) => {
      console.log("Read teammate");
      return users.filter(d => d.team === team && d.id !== id);
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
