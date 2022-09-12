import React, { useState, useEffect } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { database, storage } from "../firebase.js";
import { listAll, ref, getDownloadURL } from "firebase/storage";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import { Link } from "react-router-dom";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { useParams } from "react-router-dom";
import { selectedId } from "../components/displayGrid.js";

// import OpenModal from "../components/openModal.js";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

function DisplayPost() {
  const [postList, setPostList] = useState({});
  const [faveArray, setFaveArray] = useState([]);

  const postsCollectionRef = collection(database, "posts");

  const handleFaveClick = (event) => {
    let selectedId = event.target.id;
    // console.log(selectedId);
    // let faveArray = [];
    // let newFaveArray = [];
    function remove(id) {
      return id !== selectedId;
    }
    // if (faveArray.includes(selectedId)) {
    //   newFaveArray = faveArray.filter(remove);
    // } else {
    // setFaveArray([...faveArray, selectedId]);
    // setFaveArray({ ...faveArray, selectedId });

    // }
    console.log(faveArray);
    return faveArray;
  };

  useEffect(() => {
    const displayPost = () => {
      getDocs(postsCollectionRef).then((data) =>
        setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );
      localStorage.setItem("postList", JSON.stringify(postList));
    };
    displayPost();
  }, [postList]);

  return (
    <div>
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
        {Object.values(postList).map((post) => (
          <div className="card">
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia />
                <ImageListItem display="block">
                  <Link to={`./createddossier/${post.id}`}>
                    <img
                      src={`${post.imageURL}?w=248&fit=crop&auto=format`}
                      srcSet={`${post.imageURL}?w=248&fit=crop&auto=format&dpr=2 2x`}
                      alt={post.name}
                      loading="lazy"
                      id={post.id}
                      // onClick={handleClick}
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
                          // title={post.name}
                          title={post.name}
                          subtitle={<span>{post.country}</span>}
                          position="below"
                        />
                      </Grid>
                      <Grid
                        item
                        xs={2}
                        display="flex"
                        flexDirection="row"
                        alignContent="centre"
                      >
                        <Checkbox
                          className="fas fa-download"
                          alignitems="center"
                          justifycontent="centre"
                          {...label}
                          id={post.id}
                          onClick={handleFaveClick}
                          icon={<FavoriteBorder />}
                          checkedIcon={<Favorite />}
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
    </div>
  );
}

export default DisplayPost;
