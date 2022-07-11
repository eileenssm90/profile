import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import ArchiveIcon from "@mui/icons-material/Archive";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
// import { SearchAppBar } from "./displayGrid";
import FavoriteIcon from "@mui/icons-material/Favorite";

import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import AdbIcon from "@mui/icons-material/Adb";
import Home from "../pages/home.js";
import Grid from "@mui/material/Grid";

const pages = ["Home", "Favourites"];
// const settings = ["Profile", "Account", "Dashboard", "Logout"];

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

export function NavBar() {
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

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
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

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
                // onClick={handleClose}
                disableRipple
                onClick={() => (window.location.href = "/")}
              >
                <HomeIcon />
                Home
              </MenuItem>
              {/* <MenuItem
                // onClick={handleClose}
                disableRipple
                onClick={() => (window.location.href = "/about")}
              >
                <InfoIcon />
                About
              </MenuItem> */}
              <MenuItem
                // onClick={handleClose}
                disableRipple
                onClick={() => (window.location.href = "/favourite")}
              >
                <FavoriteIcon />
                Favourites
              </MenuItem>
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
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
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {/* {pages.map((page) => ( */}
            {/* <Button
              // key={page}
              onClick={() => (window.location.href = "/about")}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              About
            </Button> */}
            <Grid item>
              <Button
                // key={page}
                onClick={() => (window.location.href = "/favourite")}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Favourites
              </Button>
            </Grid>
            <Grid item>
              <Button
                // key={page}
                onClick={() => (window.location.href = "/form")}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                New
              </Button>
            </Grid>

            {/* ))} */}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;

// export function NavBar() {
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const open = Boolean(anchorEl);
//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };
//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <AppBar position="static">
//         <Toolbar>
//           <IconButton
//             size="large"
//             edge="start"
//             color="inherit"
//             aria-label="open drawer"
//             sx={{ mr: 2 }}
//             id="demo-customized-button"
//             aria-controls={open ? "demo-customized-menu" : undefined}
//             aria-haspopup="true"
//             aria-expanded={open ? "true" : undefined}
//             variant="contained"
//             disableElevation
//             onClick={handleClick}
//             endIcon={<KeyboardArrowDownIcon />}
//           >
//             <MenuIcon />
//           </IconButton>

//           <StyledMenu
//             id="demo-customized-menu"
//             MenuListProps={{
//               "aria-labelledby": "demo-customized-button",
//             }}
//             anchorEl={anchorEl}
//             open={open}
//             onClose={handleClose}
//           >
//             <MenuItem
//               // onClick={handleClose}
//               disableRipple
//               onClick={() => (window.location.href = "/")}
//             >
//               <HomeIcon />
//               Home
//             </MenuItem>
//             <MenuItem
//               // onClick={handleClose}
//               disableRipple
//               onClick={() => (window.location.href = "/about")}
//             >
//               <InfoIcon />
//               About
//             </MenuItem>
//             <MenuItem
//               // onClick={handleClose}
//               disableRipple
//               onClick={() => (window.location.href = "/favourite")}
//             >
//               <FavoriteIcon />
//               Favourites
//             </MenuItem>
//           </StyledMenu>
//           <Typography
//             variant="h6"
//             noWrap
//             component="div"
//             sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
//           >
//             PROFILE
//           </Typography>
//           {/* {SearchAppBar()} */}
//         </Toolbar>
//       </AppBar>
//     </Box>
//   );
// }
