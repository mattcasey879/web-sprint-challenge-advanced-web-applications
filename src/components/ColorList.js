import React, { useState } from "react";
import Color from './Color';
import EditMenu from './EditMenu';

const ColorList = (props) => {
  const { colors, editing, toggleEdit, saveEdit, deleteColor, paramId } = props;
  const [ editColor, setEditColor] = useState({ color: "", code: { hex: "" }});
  return (
    <div className="colors-wrap">
      <p id="color_title">colors</p>
      <ul>
        {colors.map(color => <Color key={color.id} paramId={paramId} setEditColor={setEditColor} color={color} toggleEdit={toggleEdit} deleteColor={deleteColor}/>
      )}
      </ul>
      
      {editing && <EditMenu editColor={editColor} paramId={paramId} setEditColor={setEditColor} toggleEdit={toggleEdit} saveEdit={saveEdit}/>}
    </div>
  );
};

export default ColorList;