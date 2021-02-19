import React from "react";
import styled from "styled-components";

const RootDiv = styled.div`
  width: 800px;
  min-height: 600px;
  border: 1px solid black;
  margin: auto;
  margin-top: 20px;

  table {
    width: 100%;
  }
`;

class ClassBasedTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userNumber: 0
    };

    this.onDelete = this.onDelete.bind(this);
  }

  onDelete(ev) {
    this.props.onDelete(ev.currentTarget.value);
  }

  static getDerivedStateFromProps(props, state) {
    return {
      ...state,
      userNumber: props.data ? props.data.length : 0
    }
  }

  render() {
    const { data } = this.props;

    return (
      <RootDiv>
        <h1>{`현재 총 ${this.state.userNumber} 명의 user가 존재합니다.`}</h1>
        <table>
          <thead>
            <tr>
              <th>Action</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d, index) => (
              <tr key={`tr_${index}`}>
                <td>
                  <button value={index} onClick={this.onDelete}>
                    delete
                  </button>
                </td>
                <td>{d}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </RootDiv>
    );
  }
}

export default ClassBasedTable;