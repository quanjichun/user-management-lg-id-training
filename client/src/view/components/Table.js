import React, { useMemo } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";

const StledTable = styled.table`
  width: 100%;

  td button {
    margin-right: 5px;
    margin-left: 5px;
  }
`;

const Table = ({ columns, data, onEdit, onDelete }) => {
  const history = useHistory();
  const onDetail = useMemo(() => ({
    label: "detail",
    handler: (d) => () => {
      history.push(d.url);
    }
  }), [history]);

  const actions = [onDetail];

  if (onEdit) actions.push(onEdit);
  if (onDelete) actions.push(onDelete);

  return (
    <StledTable>
      <thead>
        <tr>
          {actions.length > 0 ? <td>Actions</td> : ""}
          {columns.map((c) => (
            <td key={c.key}>{c.label}</td>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((d, index) => (
          <tr key={`data_${index}`}>
            {actions.length > 0 ? (
              <td>
                {actions.map(({ handler, label }, index) => (
                  <button key={`action_${index}`} onClick={handler(d)}>
                    {label}
                  </button>
                ))}
              </td>
            ) : (
              ""
            )}
            {columns.map((c, index) => {
              let result = d[c.key];
              if (c.key === "name" && d.url) {
                result = <Link to={d.url}>{d[c.key]}</Link>;
              }

              return <td key={`${c.key}_${index}`}>{result}</td>;
            })}
          </tr>
        ))}
      </tbody>
    </StledTable>
  );
};

export default Table;
