import React from "react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <ul>
      <li>
        <Link to="/simpleUserManagement">Simple User Management</Link>
      </li>
      <li>
        <Link to="/userManagement">User Management</Link>
      </li>
    </ul>
  );
};

export default Index;
