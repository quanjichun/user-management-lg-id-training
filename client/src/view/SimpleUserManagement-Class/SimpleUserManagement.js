import react from "react";
import styled from "styled-components";

const RootDiv = styled.div`
  width: 100%;
  height: 100%;

  text-align: center;

  input
`;

class SimpleUserManagement extends React.Component {
  constructor(props) {
    this.state = localStorage.getItem("users") ? localStorage.getItem("users") : [];
  }

  render() {
    return (
      <RootDiv>
        <h1>Simple User Management System - React Class</h1>
        <div>
          <input />
          <button>Add</button>
        </div>
      </RootDiv>
    )
  }
}