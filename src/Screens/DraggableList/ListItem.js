import React from "react";
import styled from "styled-components/native";
import { animated } from "react-spring/native";
import { LinearGradient } from "expo-linear-gradient";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import { Text, View, Dimensions, TouchableWithoutFeedback } from "react-native";

import { percent, useMedia } from "../../utils";

const fortyPercent = percent(40);
const sixtyPercent = percent(60);
const eightyPercent = percent(80);

const AnimatedView = animated(View)
const Gradient = styled(LinearGradient)`
  height: 90px;
  padding: 10px;
  overflow: hidden;
  position: absolute;
  border-radius: 5px;
  justify-content: center;  
`;

const ListItem = ({ label, onGesture, reset, colors, ...props }) => {
  const screen = Dimensions.get("window");
  const width = useMedia(
    ["(min-width: 1500px)", "(min-width: 1000px)", "(min-width: 600px)"],
    [fortyPercent, sixtyPercent, eightyPercent].map(productOf =>
      productOf(screen.width)
    ),
    eightyPercent(screen.width)
  );

  return (
    <TouchableWithoutFeedback
      onPressIn={() => onGesture?.(true, 0)}
      onPressOut={() => onGesture?.(false, 0)}      
    >
      <AnimatedView {...props}>
      <Gradient
        start={[0, 0]}
        colors={colors}
        style={{ width, position: 'relative' }}
        end={[-0.5, 0.866]}
        locations={[0.1, 0.9]}        
      >
        <PanGestureHandler
          onGestureEvent={({ nativeEvent: { translationY } }) => {
            onGesture?.(true, translationY);
          }}
          onHandlerStateChange={({ nativeEvent: { state }}) => {
            if (state !== State.ACTIVE) onGesture?.(false, 0)
          }}
        >
          <Text style={{ color: "#FFF", fontSize: 20, fontWeight: "700" }}>
            {label}
          </Text>
        </PanGestureHandler>
      </Gradient>
      </AnimatedView>
    </TouchableWithoutFeedback>
  );
};

export default ListItem;
