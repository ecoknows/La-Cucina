  
import React from "react";
import { StyleSheet, Dimensions, Easing } from "react-native";
import { timing } from 'react-native-redash';

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
    duration: 2500,
    toValue: 1,
    easing: Easing.linear,
  };

  const circle = {
    size: width - 250 + size,
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
