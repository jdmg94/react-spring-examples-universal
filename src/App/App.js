import React from "react";
import { SafeAreaView } from "react-native";

import Home from "../Screens/Home";
import ScriptBox from "../Screens/ScriptBox";
import FlipImage from "../Screens/FlipImage";
import PullRelease from "../Screens/PullRelease";
import MasonryGrid from "../Screens/MasonryGrid";
import TouchParallax from "../Screens/TouchParallax";
import GestureSlider from "../Screens/GestureSlider";
import DraggableList from "../Screens/DraggableList";
import AnimatingAuto from "../Screens/AnimatingAuto";
import ScriptedAnimation from "../Screens/ScriptedAnimation";

import Back from "../components/Back";
import { Switch, Route, BackButton } from "../components/Router";


const App = () => (
  <SafeAreaView
    style={{
      flex: 1
    }}
  >
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/ScriptBox" component={ScriptBox} />
      <Route exact path="/FlipImage" component={FlipImage} />
      <Route exact path="/PullRelease" component={PullRelease} />
      <Route exact path="/MasonryGrid" component={MasonryGrid} />
      <Route exact path="/TouchParallax" component={TouchParallax} />
      <Route exact path="/GestureSlider" component={GestureSlider} />
      <Route exact path="/DraggableList" component={DraggableList} />
      <Route exact path="/ScriptedAnimation" component={ScriptedAnimation} />
    </Switch>
    <Route component={Back} />
    <BackButton />
  </SafeAreaView>
);

export default App;

export {
  ScriptBox,
  FlipImage,
  PullRelease,
  MasonryGrid,
  TouchParallax,
  GestureSlider,
  DraggableList,
  AnimatingAuto,
  ScriptedAnimation
};
