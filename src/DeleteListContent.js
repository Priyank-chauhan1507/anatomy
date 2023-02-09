import React from "react";
import { IconButton } from "@material-ui/core";
import { DeleteForeverOutlined, Undo } from "@material-ui/icons";
import { makeStyles, Tooltip } from "@material-ui/core";

const useStyles = makeStyles(() => {
  return {
    container: {
      display: "flex",
      alignItems: "center",
      border: "1px solid #eee",
      padding: "10px",
      width: "100%",
      justifyContent: "space-between",
      "& > p": {
        flex: "1",
      },
    },
    mainContainer: {
      width: "100%",
    },
  };
});

function DeleteListContent(props) {
  const classes = useStyles();
  return (
    <div className={classes.mainContainer}>
      {props.list.map((item, index) => {
        return (
          <div className={classes.container}>
            <IconButton onClick={() => props.onUndoItem(index)}>
              <Tooltip title={"Undo"}>
                <Undo color={"primary"} />
              </Tooltip>
            </IconButton>
            <p>
              ({item.listType}) {item.groupType && `(${item.groupType})`}{" "}
              {item.item.id}-{item.item.anatomic__site?.getFullName()}-
              {item.item.biopsy__type}
            </p>
            <IconButton onClick={() => props.onDeleteItem(index)}>
              <Tooltip title={"Delete Forever"}>
                <DeleteForeverOutlined color={"error"} />
              </Tooltip>
            </IconButton>
          </div>
        );
      })}
    </div>
  );
}

export default DeleteListContent;
