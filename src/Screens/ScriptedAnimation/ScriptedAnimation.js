import React from "react";
import { View, Dimensions } from "react-native";
import { useSpring, animated } from "react-spring/native";

import Box from "../../components/Box";
import Container from "../../components/Container";
import { useMedia, percent } from "../../utils";

const eightyPercent = percent(80);
const sixtyPercent = percent(60);
const fortyPercent = percent(40);
const AnimatedView = animated(View);
const calculateTranslation = index => interpolation =>
  15 * Math.sin(interpolation + (index * 2 * Math.PI) / 1.6);

const ScriptedAnimation = () => {
  const boxes = [1, 2, 3, 4];
  const { width } = Dimensions.get('window')
  const boxWidth = useMedia(
    ["(min-width: 1500px)", "(min-width: 1000px)", "(min-width: 600px)"],
    [fortyPercent, sixtyPercent, eightyPercent].map(productOf =>
      productOf(width)
    ),
    eightyPercent(width)
  );
  const { radians } = useSpring({
    to: async next => {
      while (1) await next({ radians: 2 * Math.PI });
    },
    from: { radians: 0 },
    config: { duration: 3500 },
    reset: true
  });

  return (
    <Container>
      {boxes.map(index => (
        <Box
          as={AnimatedView}
          key={`box-${index}`}
          style={{
            width: boxWidth,
            transform: [
              { translateX: radians.interpolate(calculateTranslation(index)) }
            ]
          }}
        />
      ))}
    </Container>
  );
};

export default ScriptedAnimation;
