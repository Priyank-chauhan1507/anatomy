import React from "react";
import { IconButton } from "@material-ui/core";

function ButtonWithCount(props) {
  return (
    <IconButton {...props}>
      {props.children}
      {props.count > 0 && (
        <span className="badge badgeStyles" style={{ top: 5, right: 8 }}>
          {props.count}
        </span>
      )}
    </IconButton>
  );
}
export default ButtonWithCount;
