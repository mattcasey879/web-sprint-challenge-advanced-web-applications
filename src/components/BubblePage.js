import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import fetchColorService from "../services/fetchColorService";
import axiosWithAuth from "../helpers/axiosWithAuth";

const BubblePage = () => {
  const { id } = useParams();

  const [colors, setColors] = useState([]);
  const [editing, setEditing] = useState(false);
  useEffect(() => {
    fetchColorService(setColors);
  }, []);

  const toggleEdit = (value) => {
    setEditing(value);
  };

  const saveEdit = (editColor) => {
    const updatedColors = colors.filter((color) => color.id !== editColor.id);
    axiosWithAuth()
      .put(`/colors/${id}`, editColor)
      .then((res) => {
        setColors([...updatedColors, res.data]);
      })
      .catch((err) => console.log(err));
  };

  const deleteColor = (colorToDelete) => {
    axiosWithAuth()
    .delete(`/colors/${id}`)
    .then(res => console.log(res))
    .catch(err => console.log(err))
    const updatedColors = colors.filter(
      (color) => color.id !== colorToDelete.id);
    setColors(updatedColors);
  };

  return (
    <div className="container">
      <ColorList
        paramId={id}
        colors={colors}
        editing={editing}
        toggleEdit={toggleEdit}
        saveEdit={saveEdit}
        deleteColor={deleteColor}
      />
      <Bubbles colors={colors} />
    </div>
  );
};

export default BubblePage;

//Task List:
//1. When the component mounts, make an axios call to retrieve all color data and push to state.
//2. Complete toggleEdit, saveEdit, deleteColor and functions
