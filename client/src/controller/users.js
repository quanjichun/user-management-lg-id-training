import { gql, useQuery } from "@apollo/client";

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

export const useUsers = () => useQuery(GET_USERS);

export default useUsers;
