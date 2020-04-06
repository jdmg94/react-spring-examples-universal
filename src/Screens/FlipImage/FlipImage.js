import React, { useState } from "react";
import styled from "styled-components/native";
import { useSpring, animated } from "react-spring/native";
import { TouchableHighlight, Dimensions, View } from "react-native";

import { percent } from "../../utils";

const Image = styled.Image`
  align-self: center;
  position: absolute;
`;

const AnimatedImage = animated(Image);
const initialState = { opacity: 1, rotateX: 180 };
const flipedState = { opacity: 0, rotateX: 0 };

const FlipImage = () => {
  const fivePercent = percent(5);
  const eightyPercent = percent(80);
  const { height, width } = Dimensions.get("window");
  const [shouldFlip, setFlip] = useState(false);
  const { opacity, rotateX } = useSpring({
    ...(shouldFlip ? flipedState : initialState),
    config: { mass: 5, tension: 500, friction: 80 }
  });

  return (
    <View>
      <TouchableHighlight onPress={() => setFlip(!shouldFlip)}>
        <View>
          <AnimatedImage
            style={{
              top: fivePercent(height),
              width: eightyPercent(width),
              height: eightyPercent(height),
              opacity: opacity.interpolate(value => 1 - value),
              transform: [
                { perspective: 600 },
                { rotateX: rotateX.interpolate(value => `${value}deg`) }
              ]
            }}
            source={{
              uri:
                "https://images.unsplash.com/photo-1544511916-0148ccdeb877?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1901&q=80i&auto=format&fit=crop"
            }}
          />
          <AnimatedImage
            style={{
              opacity,
              top: fivePercent(height),
              width: eightyPercent(width),
              height: eightyPercent(height),
              transform: [
                { perspective: 600 },
                { rotateX: rotateX.interpolate(value => `${value}deg`) }
              ]
            }}
            source={{
              uri:
                "https://images.unsplash.com/photo-1540206395-68808572332f?ixlib=rb-1.2.1&w=1181&q=80&auto=format&fit=crop"
            }}
          />
        </View>
      </TouchableHighlight>
    </View>
  );
};

export default FlipImage;
