import * as React from "react";
import { Dimensions, StyleSheet } from "react-native";
import Svg, {
  Defs, LinearGradient, Stop, Circle,
} from "react-native-svg";
import Animated from "react-native-reanimated";
import {View,Text} from '../components';

const { interpolate, multiply } = Animated;

interface CircularPogressProps {
  progress: Animated.Value<number>;
  config: null;
}

export default ({ progress, config }: CircularPogressProps) => {
  const { size, strokeWidth, hintWidth, name, percent } = config;
  const AnimatedCircle = Animated.createAnimatedComponent(Circle);
  const { PI } = Math;
  const r = (size - strokeWidth) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = r * 2 * PI;
  const α = interpolate(progress, {
    inputRange: [0, 1],
    outputRange:[PI*2,0],
  });
  const strokeDashoffset = multiply(α, r);
  
  return (
    <View flex={false} center middle>
      <View flex={false} absolute>
        <Text size={35} extra_bold color='#FF6600'>{name}</Text>
        <Text size={30} bold center gray>{percent}</Text>
      </View>
      <Svg width={size+10} height={size+10} style={styles.container}>
      <Defs>
        <LinearGradient id="grad" x1="0" y1="0" x2="100%" y2="0">
          <Stop offset="0" stopColor="#E24300" />
          <Stop offset="1" stopColor="#f7cd46" />
        </LinearGradient>
      </Defs>
      <Circle
        stroke="#E24300"
        strokeOpacity={0.2}
        fill="none"
        {...{
          strokeWidth:hintWidth, cx, cy, r,
        }}
      />

      <AnimatedCircle
        stroke="url(#grad)"
        fill="none"
        round={10}
        strokeLinecap='round'
        strokeDasharray={`${circumference}, ${circumference}`}
        r={interpolate(progress, {
          inputRange: [0, 0],
          outputRange:[0,r],
        })}
        cx={cx}
        cy={cy}
        {...{
          strokeDashoffset, strokeWidth,
        }}
      />
    </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    transform: [{ rotateZ: "270deg" }],
  },
});
