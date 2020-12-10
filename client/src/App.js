
import "./App.css";

import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "./apolloClient";

import User from "./view/User";
import Test from "./view/Test";
import TestHook from "./view/TestHook";

function App() {

  return (
    <ApolloProvider client={apolloClient}>
      <div className="App">
        <TestHook />
      </div>
    </ApolloProvider>
  );
}

export default App;
