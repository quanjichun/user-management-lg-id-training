import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { useUsers }  from "../../controller/users";
import { USER_COLUMNS } from "./UserManagement";

const RootDiv = styled.div`
  width: 100%;
  padding: 20px;
  text-align: center;

  table {
    margin: auto;

    td {
      border: 1px solid black;
    }
  }
`;

const UserDetailPage = () => {
  const { userId } = useParams();
  const { loading, data } = useUsers();

  const user = useMemo(() => {
    let result = {};
    const id = Number.parseInt(userId);

    if (data && data.length > 0) {
      result = data.find(d => d.id === id);
      result = result ? result : {};
    }

    return result;
  }, [userId, data])

  return (
    <RootDiv>
      {loading ? (
        <div>loading...</div>
      ) : (
        <table>
          <thead>
            <tr>
              {USER_COLUMNS.map(({ key, label }) => (
                <th key={`th_${key}`}>{label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {USER_COLUMNS.map(({ key }) => (
                <td key={`td_${key}`}>{user[key]}</td>
              ))}
            </tr>
          </tbody>
        </table>
      )}
    </RootDiv>
  );
};

export default UserDetailPage;
