import * as React from "react";
import Home from "./pages/home.js";
import Dossier from "./pages/dossier.js";
// import FaveDossier from "./pages/favedossier.js";
import { Form } from "./components/form.js";
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
          <Route path="/form" element={<Form />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
