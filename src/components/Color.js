import React from "react";
import { Link } from "react-router-dom";
import axiosWithAuth from "../helpers/axiosWithAuth";
const Color = (props) => {
  const { color, setEditColor, toggleEdit, deleteColor, paramId } = props;

  const handleDelete = (e) => {
    e.preventDefault();

    deleteColor(color);
    toggleEdit(false);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    setEditColor(color);
    toggleEdit(true);
  };

  return (
    <li data-testid="color" id="color" onClick={handleEdit}>
      <Link to={`/colors/${color.id}`}>
        <span>
          <span className="delete" data-testid="delete" onClick={handleDelete}>
            x
          </span>
          {`${color.color}`}
        </span>
        <div
          className="color-box"
          style={{ backgroundColor: color.code.hex }}
        />
      </Link>
    </li>
  );
};

export default Color;
