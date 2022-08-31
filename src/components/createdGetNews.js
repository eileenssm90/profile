import axios from "axios";
import targets from "../targets.js";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemText from "@mui/material/ListItemText";
// import ListItemAvatar from "@mui/material/ListItemAvatar";
// import Avatar from "@mui/material/Avatar";
// import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { Link } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const API = "a9d282904054416b9b3eef2b06a9aa30";

var ourDate = new Date();
// var pastDate = ourDate.getDate() - 7;
// ourDate.setDate(pastDate);
// console.log(ourDate);

function handleClick(event) {
  // selectedId = parseInt(event.currentTarget.id) - 1;
  // console.log(selectedId);
}

const CreatedGetNews = ({ name }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(
        `https://newsapi.org/v2/everything?q=${name}&from=${ourDate}&sortBy=publishedAt&apiKey=${API}`
      )
      .then((response) => {
        setData(response.data.articles);
        console.log(data);
      });
  }, []);

  return (
    <>
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
        {data.map((article) => {
          return (
            <div className="card">
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardMedia component="img" />
                  <ImageListItem display="block">
                    <a href={article.url}>
                      <img
                        src={`${article.urlToImage}?w=248&fit=crop&auto=format`}
                        srcSet={`${article.urlToImage}?w=248&fit=crop&auto=format&dpr=2 2x`}
                        alt={article.title}
                        loading="lazy"
                        id={article.title}
                        onClick={handleClick}
                        resizemode="contain"
                        resizemethod="resize"
                        height={200}
                        width={340}
                        display="block"
                      />
                    </a>

                    <CardContent>
                      <Grid container display="flex" direction="row">
                        <Grid item xs={10}>
                          <div
                            style={{
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              width: "11rem",
                            }}
                          >
                            <ImageListItemBar
                              title={article.title}
                              subtitle={<span>{article.description}</span>}
                              position="below"
                            />
                          </div>
                        </Grid>
                        <Grid item xs={2}></Grid>
                      </Grid>
                    </CardContent>
                  </ImageListItem>
                </CardActionArea>
              </Card>
            </div>

            //   <Grid
            //     container
            //     columns={{ xs: 4, sm: 8, md: 12 }}
            //     rowSpacing={1}
            //     columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            //     padding={10}
            //     display="flex"
            //     justifyContent="center"
            //     gap={3}
            //   >
            //     <div className="card">
            //       <Card sx={{ maxWidth: 345 }}>
            //         <CardActionArea>
            //           <CardMedia />
            //           <ImageListItem display="block">
            //             <Link to={article.url}>
            //               <img
            //                 src={article.urlToImage}
            //                 srcSet={`${article.urlToImage}?w=248&fit=crop&auto=format&dpr=2 2x`}
            //                 alt={article.title}
            //                 loading="lazy"
            //                 id={article.title}
            //                 //   onClick={handleClick}
            //                 resizemode="contain"
            //                 resizemethod="resize"
            //                 height={200}
            //                 width={340}
            //                 display="block"
            //               />
            //             </Link>

            //             <CardContent>
            //               <Grid container display="flex" direction="row">
            //                 <Grid item>
            //                   <ImageListItemBar
            //                     title={article.title}
            //                     subtitle={<span>{article.description}</span>}
            //                     position="below"
            //                     display="block"
            //                     overflow="hidden"
            //                   />
            //                 </Grid>
            //               </Grid>
            //             </CardContent>
            //           </ImageListItem>
            //         </CardActionArea>
            //       </Card>
            //     </div>
            //   </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default CreatedGetNews;
