import React, { Fragment, useMemo } from "react";
import styled from "styled-components";

const RootDiv = styled.div`
  width: 1000px;
  height: 100%;
  margin: auto;
  border: 1px solid black;

  button {
    height: 40px;
    width: 50px;
  }

  .header {
    display: flex;
    margin: 10px;

    h1 {
      text-align: left;
      flex-grow: 1;
    }

    .components {
      margin: auto;

      > :first-child {
        margin-right: 20px;
      }
    }
  }
`;

const UserTable = ({ title, columns, data }) => {
  

  return (
    <Fragment>
      <RootDiv>
        <div className="header">
          <h1>{title}</h1>
          <div className="components">
            <input type="text" />
            <button>Add</button>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              
            </tr>
          </thead>
        </table>
      </RootDiv>
    </Fragment>
  );
};

export default UserTable;
