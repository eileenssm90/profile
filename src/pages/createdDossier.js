import * as React from "react";
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
import CreatedGetNews from "../components/createdGetNews.js";
import { database } from "../firebase.js";
import { doc, getDoc, updateDoc } from "firebase/firestore";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import EditIcon from "@mui/icons-material/Edit";
import { EditText, EditTextarea } from "react-edit-text";
import "react-edit-text/dist/index.css";

// successfully setId, but why cannot appear here?
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const label = { inputProps: { "aria-label": "Checkbox demo" } };

// const ReadMore = ({ children }) => {
//   const text = children;
//   const [isReadMore, setIsReadMore] = useState(true);
//   const toggleReadMore = () => {
//     setIsReadMore(!isReadMore);
//   };

//   return (
//     <p className="text">
//       {isReadMore ? text.slice(0, 125) : text}
//       <span onClick={toggleReadMore} className="read-or-hide">
//         {isReadMore ? "...read more" : " show less"}
//       </span>
//     </p>
//   );
// };

function CreatedDossier({
  name,
  setName,
  country,
  setCountry,
  photo,
  setPhoto,
  id,
  setId,
  background,
  setBackground,
  preoccupations,
  setPreoccupations,
  engagingHim,
  setEngagingHim,
}) {
  const [fave, setFave] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [singleDoc, setSingleDoc] = useState({});
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const params = useParams();

  useEffect(() => {
    setSelectedId(String(params.id));
    console.log(selectedId);
  }, [selectedId]);

  // useEffect(() => {
  //   const retrievedFave = JSON.parse(localStorage.getItem("fave"));
  //   // console.log("step 1");
  //   // console.log("retrieved fave" + retrievedFave);
  //   setFave(retrievedFave);
  // }, [fave.length]);
  // useEffect(() => {
  //   setPostList(localStorage.getItem("postList"));
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(database, "posts", selectedId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setSingleDoc(docSnap.data());
        console.log(singleDoc);
      }
    };
    fetchData();
  }, [selectedId]);

  // WOrks but only after editing VSCODE again. Solve the same problem previously by doing away with separate files, same file but not applicable here

  const handleSaveName = ({ value }) => {
    value !== null && setName(value);
  };

  // becomes blank when refresh page
  useEffect(() => {
    console.log(name);
    const updateData = async () => {
      const docRef = doc(database, "posts", selectedId);
      updateDoc(docRef, { name: name });
      setSingleDoc({ ...singleDoc, name: name });
    };
    updateData();
  }, [name]);

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
          src={`${singleDoc.imageURL}?w=248&fit=crop&auto=format`}
          // srcSet={`${singleDoc.imageURL}?w=248&fit=crop&auto=format&dpr=2 2x`}
          alt={singleDoc.name}
          loading="lazy"
          height={350}
          width={620}
        />
        <div onClick={() => setOpen(true)}>{<EditIcon />}</div>
        {open && (
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <img
                src={`${singleDoc.imageURL}?w=100&fit=crop&auto=format`}
                // srcSet={`${singleDoc.imageURL}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={singleDoc.name}
                loading="lazy"
                height={175}
                width={310}
              />
              {/* <React.Fragment>
                <EditText
                  // name="priceInput"
                  type="string"
                  style={{
                    fontSize: "16px",
                    border: "1px solid #ccc",
                    marginBottom: "10px",
                  }}
                  defaultValue={singleDoc.name}
                  onSave={handleSaveName}
                  // formatDisplayText={formatPrice}
                />
              </React.Fragment> */}

              <React.Fragment>
                <EditText
                  name="textbox3"
                  type="string"
                  onSave={handleSaveName}
                  defaultValue={
                    <Typography
                      gutterBottom
                      variant="h4"
                      component="div"
                      margin={1}
                    >
                      {<span>{singleDoc.name}</span>}
                    </Typography>
                  }
                  editButtonProps={{ style: { marginLeft: "5px", width: 16 } }}
                  showEditButton
                />
              </React.Fragment>
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
                    secondary={singleDoc.background}
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
                    secondary={singleDoc.preoccupations}
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
                    secondary={singleDoc.engagingHim}
                  />
                </ListItem>
              </List>
            </Box>
          </Modal>
        )}
        <Typography gutterBottom variant="h4" component="div" margin={1}>
          {<span>{singleDoc.name}</span>}
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
              secondary={singleDoc.background}
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
              secondary={singleDoc.preoccupations}
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
              secondary={singleDoc.engagingHim}
            />
          </ListItem>
        </List>
      </Grid>
    </>
  );
}

export default CreatedDossier;
