import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as CONFIG from "../../../src/config.json";

export const WorkLayout = (props) => {
  const [workspaceImage, setWorkspaceImage] = useState("");
  const [workspaceColor, setworkspaceColor] = useState("");

  const workspaceState = useSelector((state) => state.workspace);
  console.log("workspaceState==", workspaceState);

  useEffect(() => {
    if (workspaceState.selectedWorkspace) {
      const workimageName = workspaceState.selectedWorkspace.workspacePic
        ? workspaceState.selectedWorkspace.workspacePic
        : "";
      const workColor = workspaceState.selectedWorkspace.color
        ? workspaceState.selectedWorkspace.color
        : "";
      const imageUrl = CONFIG.API_URL + "/uploads/profile/" + workimageName;
      setWorkspaceImage(imageUrl);
      setworkspaceColor(workColor);
    }
  }, [workspaceState]);

  return (
    <div className="w-full">
      {workspaceImage ? (
        <div
          className="outerLayout"
          style={{
            backgroundImage: "url(" + workspaceImage + ")",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          {props.children}
        </div>
      ) : workspaceColor ? (
        <div
          className="outerLayout"
          style={{
            background: workspaceColor,
          }}
        >
          {props.children}
        </div>
      ) : (
        <div className="outerLayout">{props.children}</div>
      )}
    </div>
  );
};
