import { Modal, TouchableWithoutFeedback, View } from "react-native";
import {
  useSpring,
  useTransition,
  animated,
  config
} from "react-spring/native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import React, { useState, useImperativeHandle, forwardRef } from "react";

const AnimatedView = animated(View);
const AnimatedModal = animated(Modal);
const slideIn = { opacity: 1, translateY: 0 };
const slideOut = { opacity: 0, translateY: 200 };
const fastAnimation = { ...config.default, friction: 18, tension: 175 };

const Overlay = (
  {
    children,
    onCloseRequest,
    containerStyle,
    height = "60%",
    swipeTreshold = 150,
  },
  ref
) => {
  const [isVisible, setVisible] = useState(false);
  const [deltaY, setDelta] = useSpring(() => ({ translateY: 0 }));
  const transition = useTransition(isVisible, null, {
    unique: true,
    from: slideOut,
    enter: slideIn,
    leave: slideOut,
    config: fastAnimation
  });

  useImperativeHandle(
    ref,
    () => ({
      open: () => setVisible(true),
      close: () => setVisible(false),
      toggle: () => setVisible(prevState => !prevState)
    }),
    []
  );

  const dismiss = () => {
    setVisible(false);
    onCloseRequest?.();
  };

  return transition.map(
    ({ item, key, props: { opacity, translateY } }) =>
      item && (
        <AnimatedModal
          key={key}
          transparent
          hardwareAccelerated
          style={{ opacity }}
          onRequestClose={dismiss}
        >
          <TouchableWithoutFeedback onPress={dismiss}>
            <AnimatedView
              style={{
                flex: 1,
                opacity,
                width: "100%",
                height: "100%",
                position: "absolute",
                backgroundColor: "#8888"
              }}
            />
          </TouchableWithoutFeedback>
          <AnimatedView
            style={{
              height,
              flex: 1,
              padding: 16,
              alignItems: "center",
              backgroundColor: "#FFF",
              flexDirection: "column",
              justifyContent: "flex-start",
              ...containerStyle, // All Properties above are overrideable
              width: "100%",
              opacity,
              bottom: 0,
              elevation: 1,
              overflow: "hidden",
              position: "absolute",
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              transform: [{ translateY }, deltaY]
            }}
          >
            <PanGestureHandler
              onGestureEvent={({ nativeEvent: { translationY } }) => {
                if (translationY > 0) {
                  setDelta({ translateY: translationY });
                }
              }}
              onHandlerStateChange={({
                nativeEvent: { state, translationY }
              }) => {
                if (state !== State.ACTIVE) {
                  if (translationY > swipeTreshold) {
                    dismiss();
                  }

                  setDelta({ translateY: 0 });
                }
              }}
            >
              <View
                style={{
                  width: "100%",
                  height: 6,
                  padding: 8,
                  alignItems: "center",
                  justifyContent: "center",
                  transform: [{ translateY: -10 }]
                }}
              >
                <TouchableWithoutFeedback onPress={dismiss}>
                  <View
                    style={{
                      height: 4,
                      borderRadius: 1.5,
                      width: "20%",
                      backgroundColor: "#8888"
                    }}
                  />
                </TouchableWithoutFeedback>
              </View>
            </PanGestureHandler>
            {children}
          </AnimatedView>
        </AnimatedModal>
      )
  );
};

export default forwardRef(Overlay);
