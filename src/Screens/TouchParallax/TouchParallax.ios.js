import React from "react";
import { View, Dimensions } from "react-native";
import { animated, useSpring } from "react-spring";

import useRotation from './useRotation'
import { percent, useMedia } from "../../utils";
import SvgCssUri from '../../components/SvgImage';
import Container from "../../components/Container";

const AnimatedImage = animated(View);
const initialState = { translateX: 0, translateY: 0 };

const images = [
  "https://image.flaticon.com/icons/svg/119/119596.svg",
  "https://image.flaticon.com/icons/svg/789/789395.svg",
  "https://image.flaticon.com/icons/svg/414/414927.svg",
  "https://image.flaticon.com/icons/svg/789/789392.svg"
];

const ninetyPercent = percent(90);
const sixtyPercent = percent(60);
const fortyPercent = percent(40);
const thirtyPercent = percent(30);
const twentyPercent = percent(20);

const TouchParallax = () => {  
  const result = useRotation()
  const { width } = Dimensions.get("window");
  const itemSize = useMedia(
    ["(min-width: 1500px)", "(min-width: 1000px)", "(min-width: 600px)"],
    [twentyPercent, thirtyPercent, fortyPercent].map(productOf =>
      productOf(width)
    ),
    fortyPercent(width)
  );
  const backgroundSize = useMedia(
    ["(min-width: 1500px)", "(min-width: 1000px)", "(min-width: 600px)"],
    [fortyPercent, sixtyPercent, ninetyPercent].map(productOf =>
      productOf(width)
    ),
    ninetyPercent(width)
  );
  const { translateX, translateY } = useSpring({
    from: initialState,
    to: result,
    config: { mass: 10, tension: 120, friction: 60 }
  });

  return (
    <Container>
      <AnimatedImage
        style={{
          position: "absolute",
          height: backgroundSize,
          width: backgroundSize,
          transform: [
            { translateX: translateX.interpolate(value => value / 10) },
            { translateY: translateY.interpolate(value => value / 10) },
          ]
        }}
      >
        <SvgCssUri
          width="100%"
          height="100%"
          uri={images[0]}
          position="relative"
        />
      </AnimatedImage>
      <AnimatedImage
        style={{
          position: "absolute",
          height: itemSize,
          width: itemSize,
          transform: [
            { translateX: translateX.interpolate(value => value / 8 + 45) },
            { translateY: translateY.interpolate(value => value / 8 - 140) },
          ]
        }}
      >
        <SvgCssUri
          width="100%"
          height="100%"
          uri={images[1]}
          position="relative"
        />
      </AnimatedImage>
      <AnimatedImage
        style={{
          opacity: 0.9,
          position: "absolute",
          height: itemSize,
          width: itemSize,
          transform: [
            { translateX: translateX.interpolate(value => value / 6 - 100) },
            { translateY: translateY.interpolate(value => value / 6 - 130) },
          ]
        }}
      >
        <SvgCssUri
          width="100%"
          height="100%"
          uri={images[2]}
          position="relative"
        />
      </AnimatedImage>
      <AnimatedImage
        style={{
          position: "absolute",
          height: itemSize,
          width: itemSize,
          transform: [
            { translateX: translateX.interpolate(value => value / 5) },
            { translateY: translateY.interpolate(value => value / 5) },
          ]
        }}
      >
        <SvgCssUri
          width="100%"
          height="100%"
          uri={images[3]}
          position="relative"
        />
      </AnimatedImage>
    </Container>
  );
};

export default TouchParallax;
