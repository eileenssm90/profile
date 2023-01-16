import * as React from "react";
import { useState, useEffect } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import "../App.css";
import targets from "../targets.js";
import Dossier from "../pages/dossier.js";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Grid from "@mui/material/Grid";

import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

const label = { inputProps: { "aria-label": "Checkbox demo" } };
let cardArray = [];
let cardIdArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

let selectedId = 0;

export function DisplayGrid() {
  const [profileDatas, setProfileDatas] = useState(targets);
  const [searchTerm, setSearchTerm] = useState("");
  const [fave, setFave] = useState([]);
  const [selected, setSelected] = useState(false);

  function handleChange(event) {
    setSearchTerm(event.target.value);
    if (!event.target.value) {
      console.log("null");
      setProfileDatas(targets);
    }
  }

  function handleClick(event) {
    selectedId = parseInt(event.currentTarget.id) - 1;
    console.log(selectedId);
  }

  function handleFaveClick(event) {
    let selectedInteger = parseInt(event.target.id) - 1;
    console.log("selectedInteger " + selectedInteger);
    if (cardIdArray[selectedInteger] === 1) {
      cardArray.splice(cardArray.indexOf(selectedInteger, 1), 1);
      cardIdArray[selectedInteger] = 0;
      cardArray.sort();
      console.log(cardArray);
      console.log(cardIdArray);
      setFave(cardArray);
    } else if (cardIdArray[selectedInteger] === 0) {
      cardArray.push(targets[selectedInteger]);
      cardArray.sort();
      cardIdArray[selectedInteger] = 1;
      console.log(cardArray);
      console.log(cardIdArray);
      setFave(cardArray);
    }
  }

  useEffect(() => {
    if (searchTerm) {
      let filteredCards = targets.filter((profileData) => {
        console.log(profileData.name);
        console.log(searchTerm);
        return profileData.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setProfileDatas(filteredCards);
    }
  }, [searchTerm]);

  useEffect(() => {
    localStorage.setItem("fave", JSON.stringify(cardArray));
  }, [fave]);

  useEffect(() => {
    const retrievedFave = JSON.parse(localStorage.getItem("fave"));
    setFave(retrievedFave);
    console.log("card array" + cardArray);
  }, [fave.length]);

  return (
    <div>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
          onChange={handleChange}
          value={searchTerm}
        />
      </Search>
      <Grid
        container
        columns={{ xs: 4, sm: 8, md: 12 }}
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        padding={10}
        display="flex"
        justifyContent="center"
        gap={3}
      >
        {profileDatas.map((profileData) => (
          <div className="card">
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia />
                <ImageListItem display="block">
                  <Link to={`./dossier/${profileData.id}`}>
                    <img
                      src={`${profileData.img}?w=248&fit=crop&auto=format`}
                      srcSet={`${profileData.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                      alt={profileData.title}
                      loading="lazy"
                      id={profileData.id}
                      onClick={handleClick}
                      resizemode="contain"
                      resizemethod="resize"
                      height={200}
                      width={340}
                      display="block"
                    />
                  </Link>

                  <CardContent>
                    <Grid container display="flex" direction="row">
                      <Grid item xs={10}>
                        <ImageListItemBar
                          title={profileData.name}
                          subtitle={<span>{profileData.title}</span>}
                          position="below"
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <Checkbox
                          className="fas fa-download"
                          // xs={2}
                          alignitems="center"
                          justifycontent="centre"
                          {...label}
                          id={profileData.id}
                          onClick={handleFaveClick}
                          icon={<FavoriteBorder />}
                          checkedIcon={<Favorite />}
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                  {/* <Grid container display="flex">
                    <Grid item xs={3}></Grid>
                    <Grid
                      item
                      xs={2}
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    ></Grid>
                  </Grid> */}
                </ImageListItem>
              </CardActionArea>
            </Card>
          </div>
        ))}
      </Grid>
    </div>
  );
}

export { selectedId };

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));
