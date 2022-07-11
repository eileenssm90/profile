// import * as React from "react";
// import { Icon } from "@mui/material";
// import targets from "../targets.js";
// import AccessibilityIcon from "@mui/icons-material/Accessibility";
// import { Grid } from "@mui/material";
// import { selectedId } from "../components/displayGrid.js";
// import Expand from "./expand.js";
// import { useState } from "react";
// import "../App.css";

// const ReadMore = ({ children }) => {
//   const text = children;
//   const [isReadMore, setIsReadMore] = useState(true);
//   const toggleReadMore = () => {
//     setIsReadMore(!isReadMore);
//   };
//   return (
//     <p className="text">
//       {isReadMore ? text.slice(0, 150) : text}
//       <span onClick={toggleReadMore} className="read-or-hide">
//         {isReadMore ? "...read more" : " show less"}
//       </span>
//     </p>
//   );
// };

// export const Content = () => {
//   return (
//     <div className="container">
//       <h2>
//         <ReadMore>{targets[selectedId].background}</ReadMore>
//       </h2>
//     </div>
//   );
// };

// export function Para() {
//   return (
//     <div>
//       <Grid display="flex" direction="row" sx={{ maxWidth: 1000 }}>
//         {/* <Icon component={AccessibilityIcon} sx={{ fontSize: 50 }}></Icon> */}
//         <Grid display="flex" direction="column" sx={{ maxWidth: 1000 }}>
//           <h2>Background</h2>
//           <ReadMore>{targets[selectedId].background}</ReadMore>
//         </Grid>
//       </Grid>
//       <Grid display="flex" direction="row" sx={{ maxWidth: 1000 }}>
//         {/* <Icon component={AccessibilityIcon} sx={{ fontSize: 50 }}></Icon> */}
//         <Grid display="flex" direction="column" sx={{ maxWidth: 1000 }}>
//           <h2>Preoccupations</h2>
//           <ReadMore>{targets[selectedId].preoccupations}</ReadMore>
//         </Grid>
//       </Grid>
//       <Grid display="flex" direction="row" sx={{ maxWidth: 1000 }}>
//         {/* <Icon component={AccessibilityIcon} sx={{ fontSize: 50 }}></Icon> */}
//         <Grid display="flex" direction="column" sx={{ maxWidth: 1000 }}>
//           <h2>Worldviews</h2>
//           <ReadMore>{targets[selectedId].views}</ReadMore>
//         </Grid>
//       </Grid>
//     </div>
//   );
// }
// // export default Para;
