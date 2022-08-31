import React from "react";
import Grid from "@mui/material/Grid";
import YTSearch from "youtube-api-search";

export default function Video() {
  return (
    <Grid
      container
      display="flex"
      alignItems="center"
      justifyContent="center"
      direction="column"
      margin={5}
    >
      <iframe
        src="https://www.youtube.com/embed/E7wJTI-1dvQ"
        height={350}
        width={620}
      />
    </Grid>

    // <div>
    //   <iframe
    //     src="https://www.youtube.com/embed/E7wJTI-1dvQ"
    //     frameborder="0"
    //     allow="autoplay; encrypted-media"
    //     allowfullscreen
    //     title="video"
    //   />{" "}
    // </div>
  );
}
