import React from "react";
import { View, Text } from "react-native";
import { useSpring, animated, config } from "react-spring/native";
import { PanGestureHandler, State } from "react-native-gesture-handler";

import Knob from "../../components/Knob";
import Container from "../../components/Container";

const AnimatedView = animated(View);
const initialState = { translateX: 0, translateY: 0 };
const PullRelease = () => {
  const [{ translateX, translateY }, set] = useSpring(() => ({
    from: initialState
  }));

  return (
    <Container>
      <PanGestureHandler
        onGestureEvent={({ nativeEvent: { translationX, translationY } }) => {
          set({
            to: {
              translateX: translationX,
              translateY: translationY
            },
            config: config.default
          });
        }}
        onHandlerStateChange={({ nativeEvent: { state } }) => {
          if (state !== State.ACTIVE)
            set({ to: initialState, config: config.wobbly });
        }}
      >
        <View>
          <AnimatedView
            style={{
              elevation: 1,
              transform: [{ translateX }, { translateY }]
            }}
          >
            <Knob>
              <Text style={{ color: "#FFF", fontSize: 18, fontWeight: "700" }}>
                PULL
              </Text>
            </Knob>
          </AnimatedView>
        </View>
      </PanGestureHandler>
    </Container>
  );
};

export default PullRelease;
