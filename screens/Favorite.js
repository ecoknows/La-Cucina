import React, {useState, useRef} from 'react';
import {StyleSheet, Animated} from 'react-native';
import { View,Text, Pic } from '../components';

let isWidth = 0;


function Favorite(){

    const scale_line = useRef(new Animated.Value(0)).current;
    const text_anim = useRef(new Animated.Value(0)).current;
    const animation_in =()=>{
        Animated.sequence([
            
        Animated.timing(scale_line,{
            toValue: 1
            
        }),
        
        Animated.timing(text_anim,{
            toValue: 10
        }),
        
        Animated.timing(scale_line,{
            toValue: 0
            
        }),

        ]).start();
    }

    
    const animation_out =()=>{
        Animated.sequence([
            
        Animated.timing(scale_line,{
            toValue: 1
            
        }),
        
        Animated.timing(text_anim,{
            toValue: isWidth
        }),
        
        Animated.timing(scale_line,{
            toValue: 0
            
        }),

        ]).start();
    }

    

    animation_in();
    



    return(
        <View white middle row paddingLeft={100}>
            <View animated flex={false} accent size={[3,25]} 
                style={{
                    transform: [{
                        scaleY: scale_line
                    }]
                }}
            />
            <View flex={false} animated row style={{
                transform:[{translateX : text_anim }],
                }}
                onLayout={(event) => {
                    var {x, y, width, height} = event.nativeEvent.layout;
                    isWidth = -(width+5);
                    text_anim.setValue(-(width+5))
                  }}
                >    
                
            <Pic
            size={[25,25]}
            accent
            src={require('../assets/images/time.png')} />
            <Text accent size={13}
            >32 Mins Finished</Text>
            </View>
        </View>
    )
}

export default Favorite;
