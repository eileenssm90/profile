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
import { useParams } from "react-router-dom";
import { collection, getDoc, doc, updateDoc } from "firebase/firestore";
import { database, storage } from "../firebase.js";

const label = { inputProps: { "aria-label": "Checkbox demo" } };
const API = "a9d282904054416b9b3eef2b06a9aa30";
var ourDate = new Date();

const CreatedGetNews = () => {
  const [data, setData] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [singleDoc, setSingleDoc] = useState({});

  const params = useParams();

  useEffect(() => {
    setSelectedId(String(params.id));
  }, [selectedId]);

  // why not downloading name - too slow, what is the dependency
  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(database, "posts", selectedId);
      const docSnap = await getDoc(docRef);
      setSingleDoc(docSnap.data());
    };
    fetchData();
    console.log(singleDoc);
  }, [selectedId, singleDoc.name]);

  useEffect(() => {
    const fetchNews = () => {
      axios
        .get(
          `https://newsapi.org/v2/everything?q=${singleDoc.name}&from=${ourDate}&sortBy=publishedAt&apiKey=${API}`
        )
        .then((response) => {
          setData(response.data.articles);
          console.log(response.data.articles);
        });
    };
    fetchNews();
  }, [selectedId, data]);

  return (
    <>
      {data.map((article) => {
        return (
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
            <div className="card">
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardMedia component="img" />
                  <ImageListItem display="block">
                    <Link to={article.url}>
                      <img
                        src={`${article.urlToImage}?w=248&fit=crop&auto=format`}
                        srcSet={`${article.urlToImage}?w=248&fit=crop&auto=format&dpr=2 2x`}
                        alt={article.title}
                        loading="lazy"
                        id={article.title}
                        onClick={() => {
                          window.location.href = article.url;
                        }}
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
          </Grid>
        );
      })}
    </>
  );
};

export default CreatedGetNews;
