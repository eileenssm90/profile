import * as React from "react";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
// import { selectedId } from "../components/displayGrid.js";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
const label = { inputProps: { "aria-label": "Checkbox demo" } };
let selectedIdFave = 0;

function Favourite() {
  const [fave, setFave] = useState([]);

  // first retrieve
  useEffect(() => {
    const retrievedFave = JSON.parse(localStorage.getItem("fave"));
    console.log("step 1");
    console.log("retrieved fave" + retrievedFave);
    setFave(retrievedFave);
  }, [fave.length]);

  function handleClick(event) {
    selectedIdFave = parseInt(event.currentTarget.id) - 1;
    console.log("selectedId " + selectedIdFave);
  }

  // unchecking favourite to remove from array
  function handleFaveClick(event) {
    let selectedIndex = Number(event.target.id);
    console.log("selectedIndex " + selectedIndex);

    function removeItemFromArray(array, n) {
      for (let i = 0; i < array.length; i++) {
        if (array[i].id === n) {
          return i;
        }
      }
    }
    let tempIndex = removeItemFromArray(fave, selectedIndex);
    console.log("tempIndex" + tempIndex);
    // console.log("Fave Array Index" + fave.indexOf(selectedIndex));
    fave.splice(tempIndex, 1);
    setFave([...fave]);
    localStorage.setItem("fave", JSON.stringify(fave));
  }

  return (
    <>
      {/* <nav>{NavBar()} </nav> */}

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
        {fave.map((profileData) => (
          <div className="card">
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <ImageListItem display="block">
                  <Link to={`/dossier/${profileData.id}`}>
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
                      component="checkbox"
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
                          alignitems="center"
                          justifycontent="centre"
                          {...label}
                          id={profileData.id}
                          onClick={handleFaveClick}
                          // icon={<FavoriteBorder />}
                          checkedIcon={<Favorite />}
                          defaultChecked="checked"
                          checked="true"
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </ImageListItem>
              </CardActionArea>
            </Card>
          </div>
        ))}
      </Grid>
    </>
  );
}

export { Favourite };
export { selectedIdFave };
