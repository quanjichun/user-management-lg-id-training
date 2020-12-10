import React, { useState, useEffect } from "react";
import styled from "styled-components";

const RootDiv = styled.div`
  .modal {
    position: fixed;
    width: 100%;
    left: 0;
    top: 0;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .display-none {
    display: none;
  }

  .container {
    border: 1px solid black;
    background-color: white;
    color: black;

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

    .buttons {
      margin: 10px;

      > :first-child {
        margin-right: 20px;
      }
    }
  }
`;

const Modal = ({ open, title, columns, data, closeModal, confirmHandler }) => {
  const [modalData, setModalData] = useState({});

  useEffect(() => {
    const obj = {};
    columns.forEach((c) => {
      obj[c.key] = data[c.key];
		});
		obj["id"] = data["id"];
    setModalData(obj);
  }, [data, columns]);

  const inputChanged = (e) => {
    setModalData({
      ...modalData,
      [e.target.getAttribute("data-key")]: e.target.value,
    });
  };

  const confirmClicked = () => {
    confirmHandler(modalData, title);
    closeModal();
  };

  return (
    <RootDiv>
      <div className={`modal ${open ? "" : "display-none"}`}>
        <div className="container">
          <h1>{title}</h1>
          <div>
            {columns.map((c) => (
              <div className="item" key={`popup_${c.key}`}>
                <div>{`${c.label}:`}</div>
                <input
                  data-key={c.key}
                  value={modalData[c.key] ? modalData[c.key] : ""}
                  onChange={inputChanged}
                />
              </div>
            ))}
          </div>
          <div className="buttons">
            <button onClick={confirmClicked}>Confirm</button>
            <button onClick={closeModal}>Cancel</button>
          </div>
        </div>
      </div>
    </RootDiv>
  );
};

export default Modal;
