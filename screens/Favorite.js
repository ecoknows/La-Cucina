import React, {useState, useEffect, useRef} from 'react';
import { View,Text, Pic } from '../components';
import CirclePercent from '../svg/CirclePercent';
import {Animated,Easing} from 'react-native';


const orange ={
    start : '#FF7B36',
    middle : '#FFAD63',
    end : '#FF7B36',
}

const green ={
    start : '#1BAA09',
    middle : '#78F032',
    end : '#1BAA09',
}
const blue ={
    start : '#005EE8',
    middle : '#AAC0FF',
    end : '#005EE8',
}


function Favorite({navigation}){
    const animated = useRef(new Animated.Value(0)).current;
    
    return(
        <View white middle center>
            <View flex={false} row>
                <CirclePercent size={-30} name='KCal' rotate='0deg' percent={0.5} textSize={18} textColor='#FF6600' gradient={orange} />
                <CirclePercent size={-30} name='Fats' rotate='-140deg' percent={0.25} textSize={18} textColor='#1BAA09' gradient={green} />
                <CirclePercent size={-30} name='Iron' rotate='90deg' percent={0.75} textSize={18} textColor='#0269FF' gradient={blue} />
            </View>
            
        </View>
    );
}

export default Favorite;
