import React, { useState } from "react";
// import axios from "axios";

import axiosWithAuth from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  // console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    if (isNaN(colorToEdit.id)) {
      axiosWithAuth().post(`/api/colors`, colorToEdit)
      .then(resp => {
        // console.log(resp)
        updateColors(resp.data)
        setEditing(false)
        // setColorToEdit(initialColor)
      })
      .catch(err => console.log(err.response))
    } else {
      axiosWithAuth().put(`/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(resp => {
        // console.log(resp)
        updateColors(colors.map(e => e.id === resp.data.id ? resp.data : e))
        setEditing(false)
        // setColorToEdit(initialColor)
      })
      .catch(err => console.log(err.response))
    }
  };

  const deleteColor = (e, color) => {
    e.stopPropagation()
    // make a delete request to delete this color
    axiosWithAuth().delete(`/api/colors/${color.id}`)
    .then(resp => {
      console.log(resp)
      updateColors(colors.filter(e => e !== color))
    })
    .catch(err => console.log(err.response))
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => deleteColor(e,color)}>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      <div className="button-row">
        <button onClick={()=>{editColor(initialColor)}}>Add a color</button>
      </div>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>{isNaN(colorToEdit.id)?'add':'edit'} color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
              required
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
              pattern='#[a-f|A-F|0-9]{3}|#[a-f|A-F|0-9]{6}'
              title='Must be HTML hex code between "#000000" and "#FFFFFF"'
              required
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
