import React from "react";
import { Link as Lonk } from "react-router-dom";

export const Link = ({ style, ...props }) => (
  <Lonk style={{ ...style, textDecoration: "none" }} {...props} />
);
export const BackButton = React.Fragment;
export {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
  useHistory,
  useParams
} from "react-router-dom";
