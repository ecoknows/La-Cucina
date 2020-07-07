import React from 'react';
import { View, StyleSheet, TouchableOpacity, Animated} from 'react-native';

import { theme } from '../constants';


function ViewSheet(props){

    const { 
        animated,
        children,
        style,
    
        // behavour
        touchable,
        press,

        // position
        absolute,
        center,
        cent,
        middle,
        row,
        rowVerse,
        end,
        columVerse,

        // rotation
        rotate,
        //size 
        flex,
        size,

        // color
        white,
        accent,
        secondary,
        color,
        gray2,
        pinkish,

        // opacity
        opacity,

        
        // margin & padding
        marginX,
        marginY,
        paddingX,
        paddingY,


        ...rest
    } = props;

    const viewStyle = [
        styles.view,
        style,

        // postion
        absolute && styles.absolute,
        center && styles.center,
        cent && styles.cent,
        middle && styles.middle,
        end && styles.end,
        row && styles.row,
        rowVerse && styles.rowVerse,
        columVerse && styles.columVerse,

        // size 
        flex && { flex },
        flex === false && {flex : 0},
        size && {width: size[0], height: size[1]},

        // rotation
        rotate && {transform: [{rotate: `${rotate}deg`}]},

        
        // margin & padding
        marginX && {marginLeft: marginX[0], marginRight: marginX[1]},
        marginY && {marginTop: marginY[0], marginBottom: marginY[1]},
        paddingX && {paddingLeft: paddingX[0], paddingRight: paddingX[1]},
        paddingY && {paddingTop: paddingY[0], paddingBottom: paddingY[1]},

        // colors
        white && styles.white,
        accent && styles.accent,
        pinkish && styles.pinkish,
        secondary && styles.secondary,
        color && { backgroundColor: color },
        gray2 && styles.gray2,

        // opacity 
        opacity && {opacity},
        
    ];

    if(animated){
        return(
            <Animated.View style={viewStyle} {...rest}>
                {children}
            </Animated.View>
        );
    }


    if(touchable){
        return(
            <TouchableOpacity onPress={press} style={viewStyle} {...rest}>
                {children}
            </TouchableOpacity>
        );
    }

    return(
        <View style={viewStyle} {...rest}>
            {children}
        </View>
    );

}

export default ViewSheet;

const styles = StyleSheet.create({
    view: {
        flex: 1,
    },

    // positions
    absolute: { position: 'absolute'},
    center: {justifyContent: 'center',},
    row: {flexDirection: 'row'},
    rowVerse: {flexDirection: 'row-reverse'},
    columVerse: {flexDirection: 'column-reverse'},
    cent: { alignSelf: 'center'   },
    middle: {alignItems:  'center',},
    end: { alignSelf: 'flex-end'},

    //colors
    white: { backgroundColor: theme.colors.white },
    accent: { backgroundColor: theme.colors.accent },
    secondary: { backgroundColor: theme.colors.secondary },
    gray2: {backgroundColor: theme.colors.gray2},
    pinkish: {  backgroundColor: theme.colors.pinkish}

});