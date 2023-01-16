/* eslint-disable jsx-a11y/alt-text */
import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import targets from "../targets.js";
import { Para, Content } from "../components/para.js";
import { Icon } from "@mui/material";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import { render } from "react-dom";
import { selectedId } from "../components/displayGrid.js";
import { selectedIdFave } from "./favourite.js";

import { SearchAppBar } from "../components/displayGrid";
import { NavBar } from "../components/navBar.js";
import Grid from "@mui/material/Grid";
import Rating from "@mui/material/Rating";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import Divider from "@mui/material/Divider";
import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import { Routes, Route, useParams } from "react-router-dom";

import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const ReadMore = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  return (
    <p className="text">
      {isReadMore ? text.slice(0, 150) : text}
      <span onClick={toggleReadMore} className="read-or-hide">
        {isReadMore ? "...read more" : " show less"}
      </span>
    </p>
  );
};

function Dossier() {
  const [fave, setFave] = useState([]);
  const [selectedId, setSelectedId] = useState("");

  let { id } = useParams();
  console.log("param" + id);
  id = parseInt(id);
  console.log("id " + id);

  useEffect(() => {
    const retrievedFave = JSON.parse(localStorage.getItem("fave"));
    console.log("step 1");
    console.log("retrieved fave" + retrievedFave);
    setFave(retrievedFave);
  }, [fave.length]);

  // function handleFaveClick(event, selectedId) {
  //   let selectedIndex = parseInt(event.target.id) - 1;
  //   console.log("selectedIndex " + selectedIndex);
  //   fave.splice(fave.id.indexOf(selectedIndex, 1), 1);
  //   console.log("remaining array " + fave.length);
  //   setFave(fave);
  //   localStorage.setItem("fave", JSON.stringify(fave));
  //   console.log("step 2");
  // }

  return (
    <>
      {/* <div>Hello</div> */}
      {NavBar()}

      <Grid
        container
        display="flex"
        alignItems="center"
        justifyContent="center"
        direction="column"
        margin={5}
      >
        <img
          src={`${targets[id - 1].img}?w=248&fit=crop&auto=format`}
          srcSet={`${targets[id - 1].img}?w=248&fit=crop&auto=format&dpr=2 2x`}
          alt={targets[id - 1].title}
          loading="lazy"
          height={350}
          width={620}
        />
        <Typography gutterBottom variant="h4" component="div" margin={1}>
          {<span>{targets[id - 1].name}</span>}
        </Typography>{" "}
        <List
          sx={{
            width: "100%",
            bgcolor: "background.paper",
          }}
        >
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <ImageIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Background"
              secondary={<ReadMore>{targets[id - 1].background}</ReadMore>}
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <WorkIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Preoccupations"
              secondary={<ReadMore>{targets[id - 1].preoccupations}</ReadMore>}
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <BeachAccessIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Engaging him"
              secondary={<ReadMore>{targets[id - 1].engaging}</ReadMore>}
            />
          </ListItem>
        </List>
        {console.log(id - 1)}
        {/* <div>{Para()}</div> */}
      </Grid>
    </>
  );
}

export default Dossier;
// Dossier();
