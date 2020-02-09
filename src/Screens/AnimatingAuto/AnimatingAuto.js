import { round } from 'lodash';
import React, { useState } from "react";
import { useSpring, animated, config } from "react-spring/native";
import { Dimensions, Text, View, TouchableOpacity } from "react-native";

const AnimatedText = animated(Text);
const AnimatedView = animated(View);
const AnimatingAuto = () => {
  const [active, toggle] = useState(false);
  const [currentWdith, setCurrentWidth] = useState(0)
  const { height, width: windowWidth } = Dimensions.get("window");
  const { width } = useSpring({
    config: config.slow,
    from: { width: 0 },
    to: { width: active ? windowWidth : 0 }
  });

  React.useEffect(() => {
    width.interpolate(value => setCurrentWidth(round(value)))
  }, [width])

  return (
    <AnimatedView
      style={{
        height,
        width: windowWidth,
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <TouchableOpacity
        style={{
          height,
          width: windowWidth,
          position: "absolute"
        }}
        onPress={() => toggle(prevState => !prevState)}
      >
        <AnimatedView
          style={{
            width,
            height,
            left: 0,
            position: "absolute",
            backgroundColor: "#ADD8E6"
          }}
        />
      </TouchableOpacity>
      <AnimatedText style={{ fontSize: 64, color: "#888" }}>
        {currentWdith}
      </AnimatedText>
    </AnimatedView>
  );
};

export default AnimatingAuto;
