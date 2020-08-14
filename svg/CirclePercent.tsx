  
import React from "react";
import { Dimensions } from "react-native";
import { timing } from 'react-native-redash';
import {Easing} from 'react-native-reanimated';

import CirlePercentConfig from "./CirlePercentConfig";
import { View } from "../components";
const { width } = Dimensions.get("window");

interface CircleProps{
  size: number,
  name: string,
  rotate: string,
  percent: number,
  textSize: number,
  textColor: string,
  gradient: any,
}

const CirclePercent = ({ size, name, rotate, percent, textSize, gradient,textColor} : CircleProps ) => {
  const default_config = {
    duration: 1000,
    from: 0,
    to: percent,
    easing: Easing.linear,
  };

  const circle = {
    size: width - (width * 0.65) + size,
    strokeWidth: 10,
    hintWidth: 5,
    name,
    percent,
    circRotate: rotate,
    textSize,
    gradient,
    textColor,
  }
  
  return (
    <View flex={false}>
      <CirlePercentConfig config={circle} progress={timing(default_config)} />
    </View>
  );
};

export default CirclePercent;
