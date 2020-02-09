import Knob from "../../components/Knob";
import { View, Text } from "react-native";
import Container from "../../components/Container";
import React from "react";
import { useSpring, animated } from "react-spring/native";
import { PanGestureHandler, State } from "react-native-gesture-handler";

const initialState = { translateX: 0, translateY: 0 };
const AnimatedView = animated(View);
const PullRelease = () => {
  const [{ translateX, translateY }, set] = useSpring(() => ({
    from: initialState
  }));

  return (
    <Container>
      <PanGestureHandler
        onGestureEvent={({ nativeEvent: { translationX, translationY } }) => {
          set({ translateX: translationX, translateY: translationY });
        }}
        onHandlerStateChange={({ nativeEvent: { state } }) => {
          if (state !== State.ACTIVE) set(initialState);
        }}
      >
        <View>
          <Knob
            as={AnimatedView}
            style={{
              elevation: 1,
              transform: [{ translateX }, { translateY }]
            }}
          >
            <Text style={{ color: "#FFF", fontSize: 18, fontWeight: "700" }}>
              PULL
            </Text>
          </Knob>
        </View>
      </PanGestureHandler>
    </Container>
  );
};

export default PullRelease;
