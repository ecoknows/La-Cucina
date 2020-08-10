  
import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { Easing } from "react-native-reanimated";
import { timing } from 'react-native-redash';

import CirlePercentConfig from "./CirlePercentConfig";
const { width } = Dimensions.get("window");


const CirclePercent = (props) => {
  const config = {
    duration: 10 * 1000,
    toValue: 1,
    easing: Easing.linear,
  };
  const test = 50;

  const circle = {
    size: width - 250 + test,
    strokeWidth: 20,
    hintWidth: 10,
    name: 'KCal',
    percent: '50%'
  }
  
  return (
    <View style={styles.container}>
      <CirlePercentConfig config={circle} progress={timing(config)} />
    </View>
  );
};

export default CirclePercent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});