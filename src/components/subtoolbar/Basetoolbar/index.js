import { Grid } from "@material-ui/core";
import React from "react";
import "../SubToolbar.css";

function Control({ label, control }) {
  return (
    <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
      {label && <span className="actionText">{label}</span>}

      <span>{control}</span>
    </span>
  );
}
export default function BaseSubToolbar({ leftItems = [], rightItems = [] }) {
  return (
    <Grid
      container
      alignItems="center"
      justifyContent="space-between"
      className="subToolbar"
    >
      <Grid item id="left_grid" style={{ flex: 1, display: "flex", gap: 10 }}>
        {leftItems.map(({ label, id, control }) => {
          return <Control key={id} label={label} control={control} />;
        })}
      </Grid>
      <Grid item id="right_grid" style={{ display: "flex", gap: 10, }}>
        {rightItems.map(({ label, id, control }) => {
          return <Control key={id} label={label} control={control} />;
        })}
      </Grid>
    </Grid>
  );
}
