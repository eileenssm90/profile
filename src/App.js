import React, { useState } from "react";
import Home from "./pages/home.js";
import Dossier from "./pages/dossier.js";
import CreatedDossier from "./pages/createdDossier.js";
import Error from "./pages/error.js";
import Login from "./pages/login.js";
import { Favourite } from "./pages/favourite.js";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CreatePost from "./pages/createPost.js";
import DisplayPost from "./pages/displayPost.js";

import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Container from "@mui/material/Container";
import AdbIcon from "@mui/icons-material/Adb";
import Grid from "@mui/material/Grid";
import BadgeAvatars from "./components/badgeAvatar.js";
import { signinWithGoogle } from "./firebase.js";
import { auth, provider } from "./firebase.js";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

function App() {
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [photo, setPhoto] = useState();
  const [id, setId] = useState("xxx");
  const [background, setBackground] = useState("");
  const [preoccupations, setPreoccupations] = useState("");
  const [engagingHim, setEngagingHim] = useState("");
  const [isAuth, setIsAuth] = useState(false);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  let signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/login";
    });
  };
  return (
    <>
      <Router>
        <AppBar position="static">
          <Grid container display="flex" flexDirection="row">
            <Grid item xs={10}>
              <Container maxWidth="xl">
                <Toolbar disableGutters>
                  <AdbIcon
                    sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
                  />
                  <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                      mr: 2,
                      display: { xs: "none", md: "flex" },
                      fontFamily: "monospace",
                      fontWeight: 700,
                      letterSpacing: ".3rem",
                      color: "inherit",
                      textDecoration: "none",
                    }}
                  >
                    Profiler
                  </Typography>
                  <Box
                    sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
                  >
                    <IconButton
                      size="large"
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={handleOpenNavMenu}
                      color="inherit"
                    >
                      <MenuIcon />
                    </IconButton>
                    <Menu
                      id="menu-appbar"
                      anchorEl={anchorElNav}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                      }}
                      open={Boolean(anchorElNav)}
                      onClose={handleCloseNavMenu}
                      sx={{
                        display: { xs: "block", md: "none" },
                      }}
                    >
                      <MenuItem
                        disableRipple
                        // onClick={() => (window.location.href = "/")}
                      >
                        <Link to="/">
                          <HomeIcon />
                          Home
                        </Link>
                      </MenuItem>
                      <MenuItem
                        disableRipple
                        // onClick={() => (window.location.href = "/favourite")}
                      >
                        <Link to="/favourite">
                          <FavoriteIcon />
                          Favourites
                        </Link>
                      </MenuItem>
                      <MenuItem
                        disableRipple
                        // onClick={() => (window.location.href = "/createPost")}
                      >
                        <Link to="/createpost">
                          <AddCircleIcon />
                          Create Post
                        </Link>
                      </MenuItem>
                      <MenuItem
                        disableRipple
                        // onClick={() => (window.location.href = "/login")}
                      >
                        {isAuth ? (
                          <Link onClick={signUserOut} to="/login">
                            <AddCircleIcon />
                            Logout
                          </Link>
                        ) : (
                          <Link to="/login">
                            <AddCircleIcon />
                            Login
                          </Link>
                        )}
                      </MenuItem>
                    </Menu>
                  </Box>
                  <AdbIcon
                    sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
                  />
                  <Typography
                    variant="h5"
                    noWrap
                    component="a"
                    href=""
                    sx={{
                      mr: 2,
                      display: { xs: "flex", md: "none" },
                      flexGrow: 1,
                      fontFamily: "monospace",
                      fontWeight: 700,
                      letterSpacing: ".3rem",
                      color: "inherit",
                      textDecoration: "none",
                    }}
                  >
                    Profiler
                  </Typography>
                  <Box
                    sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
                  >
                    <Grid item display="flex" flexDirection="row">
                      <Button
                        // onClick={() => (window.location.href = "/favourite")}
                        sx={{ my: 2, color: "white", display: "block" }}
                      >
                        <Link to="/favourite">Favourites</Link>
                      </Button>
                      <Button
                        // onClick={() => (window.location.href = "/createPost")}
                        sx={{ my: 2, color: "white", display: "block" }}
                      >
                        <Link to="/createpost">Create Post</Link>
                      </Button>
                      {isAuth ? (
                        <Button
                          onClick={signUserOut}
                          // onClick={() => (window.location.href = "/login")}
                          sx={{ my: 2, color: "white", display: "block" }}
                        >
                          <Link onClick={signUserOut} to="/login">
                            Logout
                          </Link>
                        </Button>
                      ) : (
                        <Button
                          // onClick={() => (window.location.href = "/login")}
                          sx={{ my: 2, color: "white", display: "block" }}
                        >
                          <Link to="/login">Login</Link>
                        </Button>
                      )}
                    </Grid>
                  </Box>
                </Toolbar>
              </Container>
            </Grid>
            {isAuth ? (
              <Grid item xs={2}>
                {BadgeAvatars()}
                {`Welcome ${localStorage.getItem("name")}`}
              </Grid>
            ) : (
              ""
            )}
          </Grid>
        </AppBar>
        <Routes>
          <Route exact path="/" element={<Home id={id} setId={setId} />} />
          <Route exact path="/dossier/:id" element={<Dossier />} />
          <Route
            exact
            path="/createddossier/:id"
            element={
              <CreatedDossier
                name={name}
                setName={setName}
                country={country}
                setCountry={setCountry}
                id={id}
                setId={setId}
                photo={photo}
                setPhoto={setPhoto}
                background={background}
                setBackground={setBackground}
                preoccupations={preoccupations}
                setPreoccupations={setPreoccupations}
                engagingHim={engagingHim}
                setEngagingHim={setEngagingHim}
              />
            }
          />
          <Route path="/favourite" element={<Favourite />} />

          <Route
            path="/createpost"
            element={
              <CreatePost
                name={name}
                setName={setName}
                country={country}
                setCountry={setCountry}
                id={id}
                setId={setId}
                photo={photo}
                setPhoto={setPhoto}
                background={background}
                setBackground={setBackground}
                preoccupations={preoccupations}
                setPreoccupations={setPreoccupations}
                engagingHim={engagingHim}
                setEngagingHim={setEngagingHim}
              />
            }
          />
          {/* <Route
            path="/displaypost"
            element={
              <DisplayPost
                name={name}
                setName={setName}
                photo={photo}
                setPhoto={setPhoto}
                background={background}
                setBackground={setBackground}
              />
            }
          /> */}
          <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />

          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));
