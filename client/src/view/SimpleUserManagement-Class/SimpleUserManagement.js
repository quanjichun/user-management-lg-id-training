import React from "react";
import styled from "styled-components";

import { ADD_BUTTON } from "../../data/defData";
import ClassBasedTable from "../components/ClassBasedTable";

import {
  saveArrayToLS,
  readArrayFromLS,
  clearLS,
} from "../../controller/localstorage";

const RootDiv = styled.div`
  width: 100%;
  height: 100%;

  text-align: center;

  .components {
    margin: auto;

    > :first-child {
      margin-right: 20px;
    }
  }
`;

const LS_KEY = "users";

class SimpleUserManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: readArrayFromLS(LS_KEY),
    };

    this.inputRef = React.createRef();
  }

  onDelete = (d) => {
    const newArr = [...this.state.users];
    newArr.splice(d, 1);
    saveArrayToLS(LS_KEY, newArr);
    this.setState({
      users: [...newArr]
    })
  };

  onAdd = () => {
    const userName = this.inputRef.current.value.trim();

    if (userName.length === 0) return;

    const newUsers = [...this.state.users, userName];
    this.setState({
      users: newUsers,
    });
    saveArrayToLS(LS_KEY, newUsers);
    
    this.inputRef.current.value = "";
  };

  render() {
    return (
      <RootDiv>
        <h1>Simple User Management System - React Class</h1>
        <div className="components">
          <input ref={this.inputRef} type="text" />
          <button onClick={this.onAdd}>{ADD_BUTTON}</button>
        </div>
        <ClassBasedTable data={this.state.users} onDelete={this.onDelete} />
      </RootDiv>
    );
  }
}

export default SimpleUserManagement;
