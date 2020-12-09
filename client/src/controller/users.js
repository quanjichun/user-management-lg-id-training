import { gql, useQuery } from "@apollo/client";
import { useMemo } from "react";

const GET_USERS = gql`
  query users {
    users {
      id
      name
      email
      job_title
      team
    }
  }
`;

export const useUsers = () => {
  const { loading, data } = useQuery(GET_USERS);
  const columns = useMemo(() => [
    {key: "name", label: "Name"},
    {key: "email", label: "Email"},
    {key: "job_title", label: "Job Title"},
    {key: "team", label: "Team"},
  ], []);

  return { loading, data, columns };
};

export default useUsers;
