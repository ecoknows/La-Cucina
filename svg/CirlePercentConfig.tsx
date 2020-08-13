import * as React from "react";
import { Dimensions, StyleSheet,View } from "react-native";
import Svg, {
  Defs, LinearGradient, Stop, Circle,
} from "react-native-svg";
import Animated, { call, useCode } from "react-native-reanimated";
import {Text} from '../components';

const { interpolate, multiply } = Animated;

interface CircularPogressProps {
  progress: any;
  config: any;
}
const TextIncrimenting =(props)=>{
  const {textSize, progress } = props;
  const [counter,setCounter] = React.useState(0);
  
  useCode(() => {
    return call([progress], (progress) => {
      setCounter(Math.floor(progress*100));
    })
  }, [progress])

  return(
  <Text bold center gray size={textSize}>{counter}%</Text>
  )
}
const CircularPogressProps = ({ progress, config }: CircularPogressProps) => {
  const { size, strokeWidth, hintWidth, name, percent,circRotate,textSize,textColor,gradient } = config;
  const {start, middle, end} = gradient;
  const AnimatedCircle = Animated.createAnimatedComponent(Circle);
  const AnimatedView = Animated.createAnimatedComponent(View);
  const { PI } = Math;
  const r = (size - strokeWidth) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = r * 2 * PI;
  const α = interpolate(progress, {
    inputRange: [0, percent],
    outputRange:[PI*2,PI*2*(1-percent)],
  });
  
  const strokeDashoffset = multiply(α, r);
  const strokeShadowOffset = multiply(α, (r+4));
  const circumferenceShadow = (r+4) * 2 * PI;
  return (
    <AnimatedView style={{flex: 0, alignItems: 'center', justifyContent:'center'}}>
           
      <AnimatedView style={{flex:0, position:'absolute'}} >
        <Text size={textSize} extra_bold color={textColor}>{name}</Text>
        <TextIncrimenting textSize={textSize} progress={progress} />
      </AnimatedView>
      <AnimatedView flex={0} style={{flex: 0, 
       transform:[{rotate: circRotate}]
      }}>
        
          <Svg width={size+20} height={size+20} style={styles.container}>
          <Defs>
            <LinearGradient id="grad" x1="0" y1="0" x2="100%" y2="0">
              <Stop offset="0%" stopColor={start} />
              <Stop offset="50%" stopColor={middle} />
              <Stop offset="100%" stopColor={end} />
            </LinearGradient>
            
            
          
          </Defs>
          <Circle
            stroke={end}
            strokeOpacity={0.2}
            fill="none"
            {...{
              strokeWidth:hintWidth, cx: cx+10, cy:cy+10, r,
            }}
          />
          
          <AnimatedCircle
            stroke="#000"
            fill="none"
            strokeOpacity={0.03}
            strokeLinecap='round'
            strokeDasharray={`${circumferenceShadow}, ${circumferenceShadow}`}
            r={interpolate(progress, {
              inputRange: [0, 0],
              outputRange:[0,r+4],
            })}
            cx={cx+10}
            cy={cy+10}
            {...{
              strokeDashoffset:strokeShadowOffset, strokeWidth,
            }}
          >
            
          </AnimatedCircle>

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
            cx={cx+10}
            cy={cy+10}
            {...{
              strokeDashoffset, strokeWidth,
            }}
          >
            
          </AnimatedCircle>
          
        </Svg>
          <AnimatedView style={[{paddingTop:4,paddingRight:6,left:10, bottom:10,width: size, height: size
                ,position: 'absolute'
                ,transform: [{
                    rotate: interpolate(progress, {
                      inputRange: [0, percent],
                      outputRange:[0,(PI*2)*(percent)],
                    })
                }]}]}>
                  <AnimatedView style={{
                    flex:0,
                    borderRadius: r/16,
                    width: r/16,
                    height: r/16,
                    backgroundColor: 'white',
                    alignSelf: 'center',

                  }}/>

          </AnimatedView>
        
    
      </AnimatedView>
    </AnimatedView>
  );
};

export default CircularPogressProps;
const styles = StyleSheet.create({
  container: {
    transform: [{ rotateZ: "270deg" }],
  },
});
