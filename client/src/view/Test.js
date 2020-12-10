import React from "react";
import { render } from "react-dom";

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "none",
    };
    this.handleOnClick = this.handleOnClick.bind(this);
  }
  handleOnClick() {
    this.setState({
      name: "jichun",
    });
  }

  render() {
    return (
      <div>
        <h1>{this.state.name}</h1>
        <button onClick={this.handleOnClick}>Click me</button>
      </div>
    );
  }
}

export default Test;
