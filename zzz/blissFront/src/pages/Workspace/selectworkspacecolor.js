import React from "react";

const Workspacecolorpicker = (props) => {
  return (
    <div className="New-workspace-color">
      <div className="color-selector">
        <span className="circle" style={{ background: props.color }} />
        <input
          type="color"
          value={props.color}
          onChange={(e)=>props.handleColorChange(e)}
          className="hidden"
        />
      </div>
    </div>
  );
};
export default Workspacecolorpicker;
