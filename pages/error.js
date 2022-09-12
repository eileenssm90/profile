import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

export default function DescriptionAlerts() {
  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        This page is not available — <Link to={`/`}>Return Home</Link>
      </Alert>
    </Stack>
  );
}
