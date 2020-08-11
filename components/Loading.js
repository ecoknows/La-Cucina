import React, {useRef, useEffect} from 'react';
import View from './View';
import Pic from './Pic';
import { Animated, StyleSheet, Dimensions, Easing,Image } from 'react-native';

const Loading = props => {
    const { start } = props;
    const spinValue = useRef(new Animated.Value(0)).current;
    const anim =  Animated.loop(
        Animated.timing(
            spinValue,{
                toValue: 1,
                duration: 2000,
                easing: Easing.linear
            }
        )
        ,{}
    );

    if(start == true){
        anim.start();
        return(
            <View absolute middle center top='30%' left='35%' visible={false}>
                <Pic animated resizeMode='contain' src={require('../assets/images/orangeloading.png')}
                    style={{
                        transform: [{
                            rotate: spinValue.interpolate({
                                inputRange: [0, 1],
                                outputRange: ['0deg', '360deg']
                            })
                        }]
                    }}
    
                />
            </View>
        );
    }else{
        anim.stop();
        return null;
    }

}

export default Loading;