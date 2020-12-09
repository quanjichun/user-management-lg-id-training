import React from "react";

import { useUsers } from "../controller/users";
import UserTable from "./components/UserTable";
import styled from "styled-components";

const RootDiv = styled.div`
  width: 100%;
  height: 100%;

  text-align: center;
`;

const UserManagement = () => {
  const { loading, columns, data } = useUsers();

  return (
    <RootDiv>
      <h1>User Management System</h1>
      {loading ? (
        <div>loading...</div>
      ) : (
        <UserTable title="Users" data={data} columns={columns} />
      )}
    </RootDiv>
  );
};

export default UserManagement;
