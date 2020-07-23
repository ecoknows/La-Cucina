import React, {useState, useRef} from 'react';
import {StyleSheet, Animated} from 'react-native';
import { View,Text, Pic } from '../components';
import { theme } from '../constants';

let isWidth = 0;


function Favorite(){

    const colortest = { image : require('../assets/foods/maruya.png')};
    const myObject = JSON.parse( JSON.stringify(colortest));
    console.log(JSON.stringify(colortest));

    return(
        <View white middle row>
            <Pic
                src={myObject.image}
            />
           
        </View>
    )
}

export default Favorite;
