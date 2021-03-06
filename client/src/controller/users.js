import { gql, useQuery, useMutation } from "@apollo/client";

const fragment = gql`
  fragment userFragment on User {
    id
    name
    email
    team
  }
`;

const GET_USER = gql`
  query user($id: Int!) {
    user(id: $id) {
      ...userFragment
      job_title
      teammate {
        ...userFragment
        job_title
      }
    }
  }
  ${fragment}
`;

const GET_USERS = gql`
  query users($skipTitle: Boolean! = true) {
    users {
      ...userFragment
      job_title @skip(if: $skipTitle)
    }
  }
  ${fragment}
`;

const ADD_USER = gql`
  mutation addUser($user: UserInput) {
    addUser(user: $user) {
      ...userFragment
      job_title
    }
  }
  ${fragment}
`;

const UPDATE_USER = gql`
  mutation updateUser($user: UserInput) {
    updateUser(user: $user) {
      ...userFragment
      job_title
    }
  }
  ${fragment}
`;

const DELETE_USER = gql`
  mutation deleteUser($id: Int) {
    deleteUser(id: $id)
  }
`;

export const useUsers = (skipTitle) => {
  const [addUser] = useMutation(ADD_USER, {
    update(cache, { data: { addUser } }) {
      const query = { query: GET_USERS };
      const cacheUsers = cache.readQuery(query);
      cache.writeQuery({
        ...query,
        data: { users: [...cacheUsers.users, addUser] },
      });
    },
  });
  const [updateUser] = useMutation(UPDATE_USER);
  const [deleteUser] = useMutation(DELETE_USER, {
    update(cache, { data: { deleteUser } }) {
      const query = { query: GET_USERS };
      const cacheUsers = cache.readQuery(query);
      const newUsers = [...cacheUsers.users];
      const index = newUsers.findIndex((d) => d.id === deleteUser);
      newUsers.splice(index, 1);
      cache.writeQuery({ ...query, data: { users: newUsers } });
    },
  });
  const { loading, data } = useQuery(GET_USERS, {
    variables: {
      skipTitle: skipTitle,
    },
  });

  console.log(data);

  return {
    loading,
    data: !loading ? data.users : [],
    addUser,
    updateUser,
    deleteUser,
  };
};

export const useUser = (id) => {
  const { loading, data } = useQuery(GET_USER, {
    variables: {
      id,
    },
  });

  return {
    loading,
    data: !loading ? data.user : {},
  };
};

export default useUsers;
