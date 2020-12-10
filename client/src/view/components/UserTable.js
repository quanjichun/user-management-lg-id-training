import React, { Fragment, useMemo, useState, useCallback } from "react";
import styled from "styled-components";
import Modal from "./Modal";

const RootDiv = styled.div`
  width: 1000px;
  height: 100%;
  margin: auto;
  border: 1px solid black;

  button {
    height: 40px;
    width: 50px;
  }

  .header {
    display: flex;
    margin: 10px;

    h1 {
      text-align: left;
      flex-grow: 1;
    }

    .components {
      margin: auto;

      > :first-child {
        margin-right: 20px;
      }
    }
  }

  table {
    width: 100%;
  }

  td button {
    margin-right: 5px;
    margin-left: 5px;
  }
`;

const UserTable = ({ title, data, addUser, updateUser, deleteUser }) => {
  const [modal, setModal] = useState({
    open: false,
    title: "",
    data: {},
  });

  const [filter, setFilter] = useState("");

  const columns = useMemo(
    () => [
      { key: "name", label: "Name" },
      { key: "email", label: "Email" },
      { key: "job_title", label: "Job Title" },
      { key: "team", label: "Team" },
    ],
    []
  );

  const ADD_TITLE = "Add User";
  const EDIT_TITLE = "Edit User";

  const openModal = useCallback((d, title) => {
    console.log(title);
    setModal({
      open: true,
      title: title,
      data: d,
    });
  }, []);

  const closeModal = useCallback((d) => {
    setModal({
      open: false,
      title: "",
      data: {},
    });
  }, []);

  const editBtnClicked = useCallback((d) => () => openModal(d, EDIT_TITLE), [
    openModal,
  ]);
  const addBtnClicked = useCallback(() => openModal({}, ADD_TITLE), [
    openModal,
  ]);
  const deleteBtnClicked = useCallback(
    (d) => () =>
      deleteUser({
        variables: {
          id: d.id,
        },
      }),
    [deleteUser]
  );

  const confirmHandler = useCallback(
    (d, action) => {
      if (action === ADD_TITLE)
        addUser({
          variables: {
            user: d,
          },
        });
      else {
        updateUser({
          variables: {
            user: d,
          },
        });
      }
    },
    [addUser, updateUser]
  );

  const filterChanged = useCallback(
    (e) => {
      setFilter(e.target.value);
    },
    [],
  )

  const userList = filter.length > 0 ? data.filter(d => d.name.includes(filter)) : data;

  return (
    <Fragment>
      <Modal
        open={modal.open}
        title={modal.title}
        data={modal.data}
        columns={columns}
        confirmHandler={confirmHandler}
        closeModal={closeModal}
      />
      <RootDiv>
        <div className="header">
          <h1>{title}</h1>
          <div className="components">
            <input placeholder="Name Filter"  type="text" onChange={filterChanged} />
            <button onClick={addBtnClicked}>Add</button>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <td>Actions</td>
              {columns.map((c) => (
                <td key={c.key}>{c.label}</td>
              ))}
            </tr>
          </thead>
          <tbody>
            {userList.map((d, index) => (
              <tr key={`data_${index}`}>
                <td>
                  <button onClick={editBtnClicked(d)}>Edit</button>
                  <button onClick={deleteBtnClicked(d)}>Delete</button>
                </td>
                {columns.map((c, index) => (
                  <td key={`${c.key}_${index}`}>{d[c.key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </RootDiv>
    </Fragment>
  );
};

export default UserTable;
