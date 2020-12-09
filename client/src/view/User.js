import React from "react";

import { useUsers } from "../controller/users";

const User = () => {
  const { data } = useUsers();

  console.log(data);

  return <div>{JSON.stringify(data)}</div>;
};

export default User;
