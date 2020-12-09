const Koa = require("koa");
const { apolloServer } = require("./graphqlServer");

const app = new Koa();
const port = 4000;

app.use(apolloServer.getMiddleware());

app.listen({ port }, () =>
  console.log(
    `Server ready at http://localhost:${port}${apolloServer.graphqlPath}`
  )
);
