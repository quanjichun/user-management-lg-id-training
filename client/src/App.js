import "./App.css";

import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "./apolloClient";

import UserManagement from "./view/UserManagement-Hook/UserManagement";

function App() {

  return (
    <ApolloProvider client={apolloClient}>
      <div className="App">
        <UserManagement />
      </div>
    </ApolloProvider>
  );
}

export default App;
