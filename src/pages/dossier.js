import * as React from "react";
import targets from "../targets.js";
import Grid from "@mui/material/Grid";
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
import { useParams } from "react-router-dom";
import GetNews from "../components/getNews.js";
import Video from "../components/video.js";

// import Checkbox from "@mui/material/Checkbox";
// import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
// import Favorite from "@mui/icons-material/Favorite";
// import { styled, alpha } from "@mui/material/styles";
// import InputBase from "@mui/material/InputBase";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const ReadMore = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  return (
    <p className="text">
      {isReadMore ? text.slice(0, 125) : text}
      <span onClick={toggleReadMore} className="read-or-hide">
        {isReadMore ? "...read more" : " show less"}
      </span>
    </p>
  );
};

function Dossier() {
  const [fave, setFave] = useState([]);

  let { id } = useParams();
  // console.log("param" + id);
  id = parseInt(id);
  // console.log("id " + id);

  useEffect(() => {
    const retrievedFave = JSON.parse(localStorage.getItem("fave"));
    // console.log("step 1");
    // console.log("retrieved fave" + retrievedFave);
    setFave(retrievedFave);
  }, [fave.length]);

  return (
    <>
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
          <Video />
          <GetNews id={id} />
        </List>
      </Grid>
    </>
  );
}

export default Dossier;
