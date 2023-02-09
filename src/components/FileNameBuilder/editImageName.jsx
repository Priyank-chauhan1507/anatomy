import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import { useEffect } from "react";
import CustomizedDialogs from "../Dialog/Dialog";
import { formatData } from "./nameConf";

const EditImageName = ({ open, handleClose, nameIncludes, data, delimiter }) => {

  return (
    <CustomizedDialogs
      open={open}
      onClose={handleClose}
      title={"Edit Image Name"}
      body={
        <div
          style={{
            width: 400,
            marginBottom: 8,
          }}
        >
          <div
            style={{
              display: "flex",
              marginBottom: "20px",
              background: "rgba(139,182,189,.2)",
              borderRadius: 4,
              padding: 8,
              border: "1px solid rgb(139,182,189)",
              flexDirection: "column"
            }}
          >
            <span style={{ marginRight: 4, width: "9ch" }}> Preview :</span>
            <span>
              HERE
            </span>
          </div>
          {nameIncludes.map((nameObj, index) => (
            <div key={index + 23} style={{ margin: "8px 0" }}>
              <FormControl fullWidth sx={{ m: 8 }}>
                <TextField
                  id="outlined-basic"
                  label={nameObj.name}
                  // value={}
                  variant="outlined"
                />
              </FormControl>
            </div>
          ))}
        </div>
      }
    />
  );
};

export default EditImageName;
