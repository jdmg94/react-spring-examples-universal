import { shuffle } from "lodash";
import styled from "styled-components/native";
import React, { useState, useEffect } from "react";
import { Dimensions, View } from "react-native";
import { animated, useTransition } from "react-spring/native";

import data from "./data";
import { percent, useMedia } from "../../utils";

const ninetyPercent = percent(90);
const AnimatedView = animated(View);
const Wrapper = styled.View`
  flex: 1;
  padding: 0;
  width: 100%;
  margin: 35px 0 0 0;
  position: relative;
  align-items: flex-start;
  justify-content: flex-start;
  height: ${({ height }) => height || "100%"};
`;

const Image = React.memo(styled.Image`
  margin: 5px;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  position: relative;
  box-shadow: 0px 1px 2px #0004;
`)

const MasonryGrid = () => {
  const [items, set] = useState(data);
  const { width } = Dimensions.get("window");
  const columns = useMedia(
    ["(min-width: 1500px)", "(min-width: 1000px)", "(min-width: 600px)"],
    [5, 4, 3],
    3
  );

  useEffect(() => {
    const interval = setInterval(() => set(shuffle), 2000);

    return () => clearInterval(interval);
  }, []);

  const heights = new Array(columns).fill(0);
  const grid = items.map(child => {
    const column = heights.indexOf(Math.min(...heights));
    const translateX = (width / columns) * column;
    const translateY =
      (heights[column] += child.height / 2) - child.height / 2;

    return {
      ...child,
      translateY,
      translateX,
      width: ninetyPercent(width / columns),
      height: ninetyPercent(child.height / 2)
    };
  });

  const transitions = useTransition(grid, item => item.id, {
    from: ({ translateX, translateY, width, height }) => ({
      width,
      height,
      opacity: 0,
      translateY,
      translateX
    }),
    enter: ({ translateX, translateY, width, height }) => ({
      width,
      height,
      opacity: 1,
      translateX,
      translateY
    }),
    update: ({ translateX, translateY, width, height }) => ({
      width,
      height,
      translateX,
      translateY
    }),
    trail: 25,
    leave: { height: 0, opacity: 0 },
    config: { mass: 5, tension: 500, friction: 100 }
  });

  return (
    <Wrapper>
      {transitions.map(
        ({ key, item, props: { translateX, translateY, ...rest } }) =>
          item && (
            <AnimatedView
              key={key}
              style={{
                ...rest,
                elevation: 1,
                position: "absolute",
                transform: [{ translateX }, { translateY }]
              }}
            >
              <Image source={{ uri: item.uri }}/>
            </AnimatedView>
          )
      )}
    </Wrapper>
  );
};

export default MasonryGrid;
