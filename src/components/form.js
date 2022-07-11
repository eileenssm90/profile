import "../index.css";
import {
  Typography,
  AppBar,
  Toolbar,
  TextField,
  Button,
  Box,
} from "@mui/material/";

import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import { NavBar } from "../components/navBar.js";
import targets from "../targets.js";

export function Form() {
  let onSubmitForm = () => {};

  return (
    <>
      {console.log(value)}
      <nav>{NavBar()} </nav>
      <div className="App">
        <form onSubmit={onSubmitForm} key={targets.length + 1}>
          <TextField
            style={{ width: "80%", margin: "5px" }}
            type="text"
            label="Id (auto-generated)"
            variant="outlined"
          />
          <br />
          <TextField
            style={{ width: "80%", margin: "5px" }}
            type="text"
            label="Photo url"
            variant="outlined"
          />
          <br />
          <TextField
            style={{ width: "80%", margin: "5px" }}
            type="text"
            label="Name"
            variant="outlined"
          />
          <br />
          <TextField
            style={{ width: "80%", margin: "5px" }}
            type="text"
            label="Country"
            variant="outlined"
          />
          <br />
          <TextField
            style={{ width: "80%", margin: "5px" }}
            type="text"
            label="Background"
            variant="outlined"
          />
          <br />
          <TextField
            style={{ width: "80%", margin: "5px" }}
            type="text"
            label="Preoccupations"
            variant="outlined"
          />
          <br />
          <TextField
            style={{ width: "80%", margin: "5px" }}
            type="text"
            label="Engaging him"
            variant="outlined"
          />
          <br />
          <Button variant="contained" color="primary">
            Upload
          </Button>
        </form>
      </div>
    </>
  );
}
