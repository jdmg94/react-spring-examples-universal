import React, { useRef } from "react";
import { FlatList, View } from "react-native";
import styled from "styled-components/native";
import { AntDesign as Icon } from "@expo/vector-icons";

import ActionSheet from "../../components/Overlay";
import { Link } from "../../components/Router";

const Row = styled.TouchableOpacity`
  height: 60px;
  border-radius: 5px;
  margin: 5px 10px;
  padding: 0 5px;
  flex-direction: row;
  align-self: stretch;
  justify-content: space-between;
  align-items: center;
`;

const Label = styled.Text`
  color: #888;
  font-size: 18px;
  font-weight: 400;
`;

const links = [
  {
    label: "Automatic Scripted Animation",
    route: "ScriptBox"
  },
  {
    label: "Image Flip",
    route: "FlipImage"
  },
  {
    label: "Slider Animation",
    route: "GestureSlider"
  },
  {
    label: "Masonry Grid",
    route: "MasonryGrid"
  },
  {
    label: "Spring Pull",
    route: "PullRelease"
  },
  {
    label: "Automatic Scripted Boxes Animation",
    route: "ScriptedAnimation"
  },
  {
    label: "Parallax Animation (rotation iOS only)",
    route: "TouchParallax"
  }
];

const Home = () => {
  const bottomSheet = useRef();

  return (
    <>
      <FlatList
        data={links}
        contentContainerStyle={{ flexGrow: 1 }}
        keyExtractor={item => `animation-link-${item.route}`}
        // ListHeaderComponent={
        //   <Row
        //     onPress={() => {
        //       bottomSheet.current?.open();
        //     }}
        //   >
        //     <>
        //       <Label>Animated ActionSheet</Label>
        //       <Icon name="arrowright" color="#888" size={18} />
        //     </>
        //   </Row>
        // }
        renderItem={({ item }) => (
          <Link to={item.route}>
            <Row as={View}>
              <Label>{item.label}</Label>
              <Icon name="arrowright" color="#888" size={18} />
            </Row>
          </Link>
        )}
      />
      <ActionSheet ref={bottomSheet}>
        <Label>Hello Vancouver!</Label>
      </ActionSheet>
    </>
  );
};

export default Home;
