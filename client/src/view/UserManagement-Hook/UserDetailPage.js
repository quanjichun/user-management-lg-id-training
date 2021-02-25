import React, { Fragment, useMemo } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { useUser } from "../../controller/users";
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

  ul {
    margin: auto;
  }
`;

const UserDetailPage = () => {
  const { userId } = useParams();
  console.log(userId);
  const { loading, data } = useUser(Number.parseInt(userId));

  console.log(data);

  return (
    <RootDiv>
      {loading ? (
        <div>loading...</div>
      ) : (
        <Fragment>
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
                  <td key={`td_${key}`}>{data[key]}</td>
                ))}
              </tr>
            </tbody>
          </table>
          {data.teammate.length > 0 ? (
            <div>
              <h2>Teamate</h2>
              {data.teammate.map((d) => (
                <div key={`teammate_${d.id}`}>{`${d.name}, ${d.email}`}</div>
              ))}
            </div>
          ) : (
            ""
          )}
        </Fragment>
      )}
    </RootDiv>
  );
};

export default UserDetailPage;
