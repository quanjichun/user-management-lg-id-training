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
      display: inline-flex;
      flex-wrap: wrap;
      gap: 12px;

      button {
        flex-grow: 1;
      }
    }
  }
`;

const Modal = ({ open, onClose, onConfirm, children }) => {
  return (
    <RootDiv>
      <div className={`modal ${open ? "" : "display-none"}`}>
        <div className="container">
          {children}
          <div className="buttons">
            {onConfirm ? <button onClick={onConfirm}>Confirm</button> : ""}
            {onClose ? <button onClick={onClose}>Cancel</button> : ""}
          </div>
        </div>
      </div>
    </RootDiv>
  );
};

export default Modal;
