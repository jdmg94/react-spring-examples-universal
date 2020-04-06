import React from "react";
import styled from "styled-components/native";
import { AntDesign as Icon } from "@expo/vector-icons";

import { Link, useLocation } from "../Router";

const Wrapper = styled.TouchableWithoutFeedback`
  background-color: #fff;
  height: 50px;
  width: 50px;
  border-radius: 25px;
  position: absolute;
  justify-content: center;
  align-items: center;
  bottom: 20px;
  left: 10px;
  elevation: 1;
  box-shadow: 0px 1px 1px #8888;
`;

const Back = () => {
  const location = useLocation();

  return (
    location.pathname !== "/" && (
      <Link
        to="/"
        replace
        style={{
          position: "absolute",
          left: 10,
          bottom: 20,
          elevation: 1,
          borderRadius: 25,
          height: 50,
          width: 50,
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          backgroundColor: "#FFF",
          shadowColor: "#888",
          shadowRadius: 2,
          shadowOpacity: 0.4,
          shadowOffset: {
            width: 0,
            height: 1
          }
        }}
      >
        <Icon name="arrowleft" color="#888" size={25} />
      </Link>
    )
  );
};

export default Back;
