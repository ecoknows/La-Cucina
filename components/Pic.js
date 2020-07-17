import React from 'react';
import { Image, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { theme } from '../constants';


const Pic = props => {
    const {
        style,
        children,
        src,
        animated,
        press,

        // positions
        absolute,
        end,
        top,
        marginY,

        // size
        size,

        // color
        color,
        accent,


        ...rest
    } = props;

    const imageStyles = [
        style,
        styles.pic,

        // position
        absolute && { position: 'absolute'},
        end && styles.end,
        top === false && {top: 0},

        // color
        color && {tintColor: color},
        accent && styles.accent,

        // margin & padding
        marginY && { marginTop: marginY[0], marginBottom: marginY[1]},

        // size
        size && {width: size[0], height: size[1]},


    ];
    
    if(animated){
        
        return(
            <Animated.Image style={imageStyles} source={src} onPress={press} {...rest} />
        );
    }

    return(
        <Image style={imageStyles} source={src} onPress={press} {...rest} />
    );
}

export default Pic;

const styles = StyleSheet.create({
    pic: {
        flex: 0,
        width: 100,
        height: 100,
    },

    //color
    accent : { tintColor: theme.colors.accent},

    end: { alignSelf: 'flex-end' },
    
});