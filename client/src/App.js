import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "./apolloClient";

import SystemRouter from "./SystemRouter";

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <SystemRouter />
    </ApolloProvider>
  );
}

export default App;
