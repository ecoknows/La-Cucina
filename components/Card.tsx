import React from 'react';
import View from './View';
import { StyleSheet } from 'react-native';

import { theme } from '../constants';
import { TouchableOpacity } from 'react-native';


const Card = props => {

    const {
        children,
        style,
        flex,

        absolute,
        inTouchable,
        inPress,
        activeOpacity,

        //flex


        // behaviour
        round,
        elevation,

        
        ...rest
     } = props;

    const cardStyles = [
        style,
        flex && {flex},
        flex == false && {flex: 0},

        absolute && {position: 'absolute'},
        
        
        // behaviour
        round && {borderRadius: round},
        elevation && {elevation: elevation},
        // color


    ];

    if(inTouchable){
        
        return( 
            <TouchableOpacity onPress={inPress} activeOpacity={activeOpacity}>
                <View style={cardStyles} {...rest} >
                        {children}
                </View>
            </TouchableOpacity>
        );
    }

    return( 
        <View style={cardStyles} {...rest} >
            {children}
        </View>
    );

}

export default Card;