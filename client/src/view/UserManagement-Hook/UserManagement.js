import React, { useMemo, useState, useCallback } from "react";
import styled from "styled-components";
import Modal from "../components/Modal";
import Table from "../components/Table";

import { useUsers }  from "../../controller/users";

const RootDiv = styled.div`
  width: 100%;
  height: 100%;

  text-align: center;

  .content {
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
  }
`;

const TITLE = "Users";
const ADD_TITLE = "Add User";
const EDIT_TITLE = "Edit User";
const ADD_BUTTON = "Add";
const EDIT_BUTTON = "Edit";
const DELETE_BUTTON = "Delete";
const FILTER_PLACEHOLDER = "Name Filter";

const useModal = (addUser, updateUser) => {
  const [modal, setModal] = useState({
    open: false,
    title: "",
    data: {},
  });

  const openModal = useCallback((d, title) => {
    setModal({
      open: true,
      title: title,
      data: d,
    });
  }, []);

  const closeModal = useCallback(() => {
    setModal({
      open: false,
      title: "",
      data: {},
    });
  }, []);

  const confirmModal = useCallback(
    (d, action) => {
      if (action === ADD_TITLE) {
        addUser({
          variables: {
            user: d,
          },
        });
      } else {
        updateUser({
          variables: {
            user: d,
          },
        });
      }
    },
    [addUser, updateUser]
  );

  return {
    modal,
    openModal,
    confirmModal,
    closeModal,
  };
};

const useTableAction = (openModal, deleteUser, data) => {
  const [filter, setFilter] = useState("");

  const onFilterChanged = useCallback((e) => {
    setFilter(e.target.value);
  }, []);

  const onEdit = useMemo(
    () => ({
      handler: (d) => () => openModal(d, EDIT_TITLE),
      label: EDIT_BUTTON,
    }),
    [openModal]
  );

  const onDelete = useMemo(
    () => ({
      handler: (d) => () =>
        deleteUser({
          variables: {
            id: d.id,
          },
        }),
      label: DELETE_BUTTON,
    }),
    [deleteUser]
  );

  const onAdd = useCallback(() => openModal({}, ADD_TITLE), [openModal]);

  return {
    tableData:
      filter.length > 0 ? data.filter((d) => d.name.includes(filter)) : data,
    onFilterChanged,
    onEdit,
    onDelete,
    onAdd,
  };
};

const Header = ({ onFilterChanged, onAdd }) => {
  return (
    <div className="header">
      <h1>{TITLE}</h1>
      <div className="components">
        <input
          placeholder={FILTER_PLACEHOLDER}
          type="text"
          onChange={onFilterChanged}
        />
        <button onClick={onAdd}>{ADD_BUTTON}</button>
      </div>
    </div>
  );
};

const UserManagement = () => {
  const columns = useMemo(
    () => [
      { key: "name", label: "Name" },
      { key: "email", label: "Email" },
      { key: "job_title", label: "Job Title" },
      { key: "team", label: "Team" },
    ],
    []
  );

  const { loading, data, addUser, updateUser, deleteUser } = useUsers();
  const { modal, openModal, confirmModal, closeModal } = useModal(
    addUser,
    updateUser
  );
  const {
    tableData,
    onFilterChanged,
    onEdit,
    onDelete,
    onAdd,
  } = useTableAction(openModal, deleteUser, data);

  return (
    <RootDiv>
      <h1>User Management System</h1>
      {loading ? (
        <div>loading...</div>
      ) : (
        <div className="content">
          <Header onFilterChanged={onFilterChanged} onAdd={onAdd} />
          <Table
            columns={columns}
            data={tableData}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </div>
      )}
      <Modal
        open={modal.open}
        title={modal.title}
        data={modal.data}
        columns={columns}
        onConfirm={confirmModal}
        onClose={closeModal}
      />
    </RootDiv>
  );
};

export default UserManagement;