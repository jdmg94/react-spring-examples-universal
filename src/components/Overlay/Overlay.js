import { Modal, TouchableWithoutFeedback, View } from "react-native";
import { useTransition, animated, config } from "react-spring/native";
import React, { useState, useImperativeHandle, forwardRef } from "react";

const slideIn = { opacity: 1 };
const slideOut = { opacity: 0 };
const AnimatedView = animated(View);
const AnimatedModal = animated(Modal);
const fastAnimation = { ...config.default, friction: 18, tension: 175 };

const Overlay = ({ children, onCloseRequest }, ref) => {
  const [isVisible, setVisible] = useState(false);
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
    ({ item, key, props: { opacity } }) =>
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
                backgroundColor: "#8884"
              }}
            />
          </TouchableWithoutFeedback>
          <AnimatedView style={{ opacity }}>
            {children}
          </AnimatedView>
        </AnimatedModal>
      )
  );
};

export default forwardRef(Overlay);
