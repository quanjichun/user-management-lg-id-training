import React, { useMemo, useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import Modal from "../components/Modal";
import Table from "../components/Table";

import { useUsers } from "../../controller/users";
import {
  TITLE,
  ADD_TITLE,
  EDIT_TITLE,
  ADD_BUTTON,
  EDIT_BUTTON,
  DELETE_BUTTON,
  FILTER_PLACEHOLDER,
} from "../../data/defData";

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

const EditDiv = styled.div`
  .item {
    display: flex;
    flex-direction: row;
    padding: 10px;

    > :first-child {
      margin-right: 10px;
      width: 70px;
      text-align: right;
    }
  }
`;

export const USER_COLUMNS = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "job_title", label: "Job Title" },
  { key: "team", label: "Team" },
];

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

  const tableData = useMemo(
    () =>
      data.map((d) => ({
        ...d,
        url: `/userManagement/userDetail/${d.id}`,
      })),
    [data]
  );

  return {
    tableData:
      filter.length > 0
        ? tableData.filter((d) => d.name.includes(filter))
        : tableData,
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

const EditPopup = ({ open, title, columns, data, onClose, onConfirm }) => {
  const [editData, setEditData] = useState({});

  useEffect(() => {
    const obj = {};
    console.log(data);
    columns.forEach((c) => {
      obj[c.key] = data[c.key];
    });
    obj["id"] = data["id"];
    setEditData(obj);
  }, [data, columns]);

  const inputChanged = (e) => {
    setEditData({
      ...editData,
      [e.target.getAttribute("data-key")]: e.target.value,
    });
  };

  const confirmClicked = () => {
    onConfirm(editData, title);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} onConfirm={confirmClicked}>
      <EditDiv>
        <h1>{title}</h1>
        {columns.map((c) => (
          <div className="item" key={`popup_${c.key}`}>
            <div>{`${c.label}:`}</div>
            <input
              data-key={c.key}
              value={editData[c.key] ? editData[c.key] : ""}
              onChange={inputChanged}
            />
          </div>
        ))}
      </EditDiv>
    </Modal>
  );
};

const UserManagement = () => {
  const { loading, data, addUser, updateUser, deleteUser } = useUsers(false);
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

  console.log(tableData);

  return (
    <RootDiv>
      <h1>User Management System</h1>
      {loading ? (
        <div>loading...</div>
      ) : (
        <div className="content">
          <Header onFilterChanged={onFilterChanged} onAdd={onAdd} />
          <Table
            columns={USER_COLUMNS}
            data={tableData}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </div>
      )}
      <EditPopup
        open={modal.open}
        title={modal.title}
        data={modal.data}
        columns={USER_COLUMNS}
        onConfirm={confirmModal}
        onClose={closeModal}
      />
    </RootDiv>
  );
};

export default UserManagement;
