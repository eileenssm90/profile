import * as React from "react";
import { DisplayGrid } from "../components/displayGrid.js";
import DisplayPost from "./displayPost.js";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

function Home({ id, setId }) {
  // const [fave, setFave] = useState([]);

  // useEffect(() => {
  //   const retrievedFave = JSON.parse(localStorage.getItem("fave"));
  //   // console.log("step 1");
  //   // console.log("retrieved fave" + retrievedFave);
  //   setFave(retrievedFave);
  // }, [fave.length]);

  return (
    <>
      <>
        {DisplayGrid()}
        {DisplayPost({ id, setId })}
      </>
    </>
  );
}

export default Home;
