import React from "react";
import styled from "styled-components/native";
import { View, Text, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSpring, animated } from "react-spring/native";
import { PanGestureHandler, State } from "react-native-gesture-handler";

import { useMedia, percent } from '../../utils';
import Container from "../../components/Container";

const AnimatedView = animated(View);
const AnimatedGradient = animated(LinearGradient);
const Dot = styled.View`
  width: 40px;
  height: 40px;
  margin: 0 10px;
  border-radius: 20px;
  background-color: #FFF;
`;

const Handle = styled.View`
  width: 100%;
  height: 100%;
  border-radius: 5px;
  position: absolute;
  align-items: center;
  justify-content: center;
  background-color: #272727;
`;

const Wrapper = styled.View`
  border-radius: 5px;
  height: ${({ height }) => height || '100px'};
  width: ${({ width }) => width || '80%'};
`;

const PinkRed = ["#F093FB", "#F5576C"];
const YellowGreen = ["#96FBC4", "#F9F586"];
const initialState = {
  scale: 1,
  translateX: 0,
  immediate: false
};

const GestureSlider = () => {  
  const adjustedWidth = useMedia(["(min-width: 1500px)", "(min-width: 1000px)", "(min-width: 600px)"], ['30%', '50%', '80%'], '80%')
  const [{ scale, translateX }, set] = useSpring(() => initialState);

  return (
    <Container>
      <PanGestureHandler
        onGestureEvent={({ nativeEvent: { translationX } }) => {
          set({
            scale: 1.1,
            immediate: true,
            translateX: translationX
          });
        }}
        onHandlerStateChange={({ nativeEvent: { state } }) => {
          if (state !== State.ACTIVE) set(initialState);
        }}
      >
        <Wrapper width={adjustedWidth}>
          <AnimatedGradient
            start={[0, 0]}
            locations={[0, 1]}
            end={[-0.5, 0.866]}
            style={{
              height: 80,
              borderRadius: 5,
              overflow: 'visible',
              position: "relative",
              justifyContent: "center"
            }}
            colors={translateX.interpolate(value =>
              value > 0 ? YellowGreen : PinkRed
            )}
          >
            <Dot
              as={AnimatedView}
              style={{
                alignSelf: translateX.interpolate(value =>
                  value < 0 ? "flex-end" : "flex-start"
                ),
                transform: [
                  {
                    scale: translateX.interpolate({
                      map: Math.abs,
                      range: [50, 300],
                      output: [0.5, 1],
                      extrapolate: "clamp"
                    })
                  }
                ]
              }}
            />
            <Handle
              as={AnimatedView}
              style={{
                transform: [{ scale }, { translateX }]
              }}
            >
              <Text style={{ color: "#FFF", fontSize: 28, fontWeight: "700" }}>
                Slide.
              </Text>
            </Handle>
          </AnimatedGradient>
        </Wrapper>
      </PanGestureHandler>
    </Container>
  );
};

export default GestureSlider;
