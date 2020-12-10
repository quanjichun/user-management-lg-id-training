import React, { useState } from "react";

const TestHook = () => {
  //const [name, setName] = useState("noneHook");
  const [state, setState] = useState({
    name: "noneHook"
  });

  const handleOnClick = () => {
    //setName("jichunHook");
    setState({
      name: "jichunHook"
    });
  }

  return (
    <div>
      <h1>{state.name}</h1>
      <button onClick={handleOnClick}>
          Click me
      </button>
    </div>
  );
}

export default TestHook;