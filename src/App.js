import * as React from "react";
import Home from "./pages/home.js";
import Dossier from "./pages/dossier.js";
import Error from "./pages/error.js";
import { Favourite } from "./pages/favourite.js";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/dossier/:id" element={<Dossier />} />
          <Route path="/favourite" element={<Favourite />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
