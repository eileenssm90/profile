import * as React from "react";
import { DisplayGrid } from "../components/displayGrid.js";
import { NavBar } from "../components/navBar.js";
import { useState, useEffect } from "react";

function Home() {
  const [fave, setFave] = useState([]);

  useEffect(() => {
    const retrievedFave = JSON.parse(localStorage.getItem("fave"));
    console.log("step 1");
    console.log("retrieved fave" + retrievedFave);
    setFave(retrievedFave);
  }, [fave.length]);

  return (
    <>
      <nav>{NavBar()}</nav>
      {DisplayGrid()}
    </>
  );
}

export default Home;
