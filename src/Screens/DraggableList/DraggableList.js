import swap from "lodash-move";
import { clamp } from "lodash";
import React, { useRef } from "react";
import { Dimensions, View } from "react-native";
import { useSprings } from "react-spring/native";

import items from "./data";
import ListItem from "./ListItem";

const func = (active, order, curIndex, originalIndex, translateY) => index =>
  active && index === originalIndex
    ? {
        zIndex: 1,
        shadow: 15,
        scale: 1.2,
        translateY: curIndex * 30 + translateY,
        immediate: true
      }
    : {
        scale: 1,
        shadow: 1,
        zIndex: 0,
        immediate: false,
        translateY: order.indexOf(index) * 30
      };

const DraggableList = () => {
  const { height, width } = Dimensions.get("window");
  const order = useRef(items.map((_, i) => i));
  const [springs, set] = useSprings(items.length, func(false, order.current));
  const moveItem = originalIndex => (active, translateY) => {
    const curIndex = order.current.indexOf(originalIndex);
    const curRow = clamp(
      Math.round((curIndex * 100 + translateY) / 100),
      0,
      items.length - 1
    );

    const newOrder = swap(order.current, curIndex, curRow);

    set(func(active, newOrder, curIndex, originalIndex, translateY));
    order.current = newOrder;
  };

  return (
    <View
      style={{ height, width, justifyContent: "center", alignItems: "center" }}
    >
      {springs.map(({ translateY, scale, shadow, zIndex }, index) => {
        const { gradient, label } = items[index];

        return (
          <ListItem
            key={index}
            label={label}
            colors={gradient}
            onGesture={moveItem(index)}
            style={{              
              zIndex,
              transform: [{ translateY }, { scale }],
            }}
          />
        );
      })}
    </View>
  );
};

export default DraggableList;
