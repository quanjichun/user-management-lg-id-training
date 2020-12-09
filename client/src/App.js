
import "./App.css";

import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "./apolloClient";

import User from "./view/User";

function App() {

  return (
    <ApolloProvider client={apolloClient}>
      <div className="App">
        <User />
      </div>
    </ApolloProvider>
  );
}

export default App;
