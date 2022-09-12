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

import { database, storage } from "../firebase.js";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
// import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import EditIcon from "@mui/icons-material/Edit";
import { EditText, EditTextarea } from "react-edit-text";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-edit-text/dist/index.css";
import ImageListItemBar from "@mui/material/ImageListItemBar";

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
  const [file, setFile] = useState("");
  const [imageURL, setImageURL] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const params = useParams();
  let navigate = useNavigate();

  const metadata = {
    contentType: "image/jpeg",
  };

  //if slow to load, need a dependence for set effect
  useEffect(() => {
    setSelectedId(String(params.id));
    // console.log(selectedId);
  }, [selectedId]);

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(database, "posts", selectedId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setSingleDoc(docSnap.data());
      }
    };
    fetchData();
    console.log(singleDoc);
  }, [selectedId]);

  useEffect(() => {
    const uploadFile = () => {
      const time = new Date().getTime();
      const imageStorageRef = ref(storage, `/photo_${time}`);
      const uploadTask = uploadBytesResumable(imageStorageRef, file, metadata);
      uploadTask.on("state_changed", (snapshot) => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageURL(downloadURL);
          // setId(new Date().getTime());
          // console.log(id);
        });
      });
    };
    file && uploadFile();
  }, [file]);

  const handleUpload = async () => {
    const docRef = doc(database, "posts", selectedId);
    await updateDoc(docRef, { imageURL });
    setSingleDoc({ ...singleDoc, imageURL });
  };

  const deletePost = async () => {
    const docRef = doc(database, "posts", selectedId);
    await deleteDoc(docRef);
    const showToastMessage = () => {
      toast.success("Deleted!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    };

    showToastMessage();
    navigate("/");
  };

  // Updating name

  const handleSaveName = ({ value }) => {
    if (value !== "") {
      setName(value);
    }
    return name;
  };

  useEffect(() => {
    const updateData = async () => {
      const docRef = doc(database, "posts", selectedId);
      updateDoc(docRef, { name: name });
      setSingleDoc({ ...singleDoc, name: name });
    };
    updateData();
  }, [name]);

  // Updating background

  const handleSaveBackground = ({ value }) => {
    if (value !== "") {
      setBackground(value);
    }
  };

  useEffect(() => {
    // console.log(name);
    const updateData = async () => {
      const docRef = doc(database, "posts", selectedId);
      updateDoc(docRef, { background: background });
      setSingleDoc({ ...singleDoc, background: background });
    };
    updateData();
  }, [background]);

  // Updating preoccupations
  const handleSavePreoccupations = ({ value }) => {
    if (value !== "") {
      setPreoccupations(value);
    }
  };

  useEffect(() => {
    // console.log(name);
    const updateData = async () => {
      const docRef = doc(database, "posts", selectedId);
      updateDoc(docRef, { preoccupations: preoccupations });
      setSingleDoc({ ...singleDoc, preoccupations: preoccupations });
    };
    updateData();
  }, [preoccupations]);

  // Updating engaging
  const handleSaveEngagingHim = ({ value }) => {
    if (value !== "") {
      setEngagingHim(value);
    }
  };

  useEffect(() => {
    // console.log(name);
    const updateData = async () => {
      const docRef = doc(database, "posts", selectedId);
      updateDoc(docRef, { engagingHim: engagingHim });
      setSingleDoc({ ...singleDoc, engagingHim: engagingHim });
    };
    updateData();
  }, [engagingHim]);

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
        <Grid
          container
          display="flex"
          alignItems="center"
          justifyContent="center"
          direction="row"
          margin={5}
        >
          <div onClick={() => setOpen(true)}>{<EditIcon />}</div>
          <DeleteIcon onClick={deletePost} />
        </Grid>
        {open && (
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              {/* Editing image */}
              <img
                src={`${singleDoc.imageURL}?w=100&fit=crop&auto=format`}
                alt={singleDoc.imageURL}
                loading="lazy"
                height={175}
                width={310}
              />
              <input
                type="file"
                onChange={(event) => setFile(event.target.files[0])}
              ></input>
              <button onClick={handleUpload}>Preview</button>
              <React.Fragment>
                {/* Editing name */}
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
              <ImageListItemBar
                subtitle={<span>{singleDoc.country}</span>}
                position="below"
              />
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
                  <React.Fragment>
                    {/* Editing name */}
                    <EditText
                      name="textbox3"
                      type="string"
                      style={{ width: "250px" }}
                      onSave={handleSaveBackground}
                      defaultValue={
                        <ListItemText
                          primary="Background"
                          secondary={singleDoc.background}
                        />
                      }
                      editButtonProps={{
                        style: { marginLeft: "5px", width: 16 },
                      }}
                      showEditButton
                    />
                  </React.Fragment>
                </ListItem>

                <Divider variant="inset" component="li" />
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <WorkIcon />
                    </Avatar>
                  </ListItemAvatar>

                  <React.Fragment>
                    <EditText
                      name="textbox3"
                      type="string"
                      onSave={handleSavePreoccupations}
                      style={{ width: "250px" }}
                      defaultValue={
                        <ListItemText
                          primary="Preoccupations"
                          secondary={singleDoc.preoccupations}
                        />
                      }
                      editButtonProps={{
                        style: { marginLeft: "5px", width: 16 },
                      }}
                      showEditButton
                    />
                  </React.Fragment>
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <BeachAccessIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <React.Fragment>
                    {/* Editing name */}
                    <EditText
                      name="textbox3"
                      type="string"
                      onSave={handleSaveEngagingHim}
                      style={{ width: "250px" }}
                      defaultValue={
                        <ListItemText
                          primary="Engaging Him"
                          secondary={singleDoc.engagingHim}
                        />
                      }
                      editButtonProps={{
                        style: { marginLeft: "5px", width: 16 },
                      }}
                      showEditButton
                    />
                  </React.Fragment>

                  {/* <ListItemText
                    primary="Engaging him"
                    secondary={singleDoc.engagingHim}
                  /> */}
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
            <ListItemText
              primary="Background"
              secondary={singleDoc.background}
            />
          </ListItem>
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
          <CreatedGetNews />
        </List>
      </Grid>
    </>
  );
}

export default CreatedDossier;
