import React from "react";
import { useHistory } from "react-router-dom";

const SimpleUserDetailPage = () => {
  const history = useHistory();
  const params = new URLSearchParams(history.location.search).get("params");

  let name = "None";
  if (params) {
    name = JSON.parse(params).name;
  }

  return (
    <div style={{textAlign: "center"}}>
      <h1>{name}</h1>
    </div>
  );
};

export default SimpleUserDetailPage;
