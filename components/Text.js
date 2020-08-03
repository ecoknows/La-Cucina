import React from 'react';
import { Text, StyleSheet, Animated,TouchableOpacity } from 'react-native';
import { theme, } from '../constants';


const TextEdited = props => {

    const {
        style,
        children,
        animated,
        pogi,

        create,

        // behaviour
        press,
        touchable,

        // font size
        h1,
        h2,
        h3,
        caption,

        // font family
        family,
        // font style
        abold,
        alight,
        aregular,
        asemi_bold,

        // font style
        bold,
        light,

        // size
        size,

        // margins & padding
        margin,
        top, left, right, bottom,
        ptop, pleft, pright, pbottom,

        // positions
        absolute,
        end,
        center,

        // rotation
        rotate,

        // color
        accent,
        secondary,
        white,
        thirdary,
        color,
        opacity,
        gray,
        gray3,


        ...rest
    } = props;

    const {
        tFlex,
    }  = props

    const touchableStyle = [
        tFlex && {flex : tFlex}
    ];



    const layout = [
        ptop && {paddigTop: ptop},
        pleft && {paddigLeft: pleft}, 
        pright && {paddigRight: pright}, 
        pbottom && {paddigBottom: pbottom},

        top && {marginTop: top }, 
        left && {marginLeft: left }, 
        right && {marginRight: right }, 
        bottom && {marginBottom: bottom },
    ]

    const textStyle = [
        styles.text,
        style,

        // arr
        layout,

        // font family 
        family && { fontFamily: `OpenSans-${family}`},

        
        // font size
        h1 && styles.h1,
        h2 && styles.h2,
        h3 && styles.h3,
        caption && styles.caption,

        // font style
        bold && styles.bold,
        light && styles.light,
        abold && styles.abold,
        alight && styles.alight,
        aregular && styles.aregular,
        asemi_bold && styles.asemi_bold,

        // positions
        absolute && styles.absolute,
        end && styles.end,
        center && styles.center,

        // rotation
        rotate && {transform: [{rotate: `${rotate}deg`}]},

        // color
        accent && styles.accent,
        secondary && styles.secondary,
        white && styles.white,
        thirdary && styles.thirdary,
        color && {color: color},
        gray && styles.gray,
        gray3 && styles.gray3,

        opacity && {opacity : opacity},


        // size
        size && { fontSize: size},

    ]

    if(children == null){
        return null;
    }

    if(touchable){
        return(
            <TouchableOpacity 
                style={touchableStyle}
                onPress={press}>
                <Text 
                    
                    style={textStyle}
                    {...rest}>
                    {children}
                </Text>
            </TouchableOpacity>
        );
    }

    if(animated){
        return(
            <Animated.Text 
                style={textStyle}
                {...rest}>
                {children}
            </Animated.Text>
        );
    }

    return(
        <Text 
            
            style={textStyle}
            {...rest}>
            {children}
        </Text>
    );

}

export default TextEdited;

const styles = StyleSheet.create({
    text: {
        fontSize: theme.fonts.base,
        fontFamily: 'OpenSans-regular',
    },

    // font style
    bold: {fontFamily: 'OpenSans-bold' },
    light: {fontFamily: 'OpenSans-light' },

    // position
    absolute: { position: 'absolute'},
    end: { alignSelf: 'flex-end',},
    center: { textAlign: 'center',},

    // color
    accent: {color: theme.colors.accent},
    secondary: {color: theme.colors.secondary},
    white: {color: theme.colors.white},
    thirdary: {color: theme.colors.thirdary},
    gray:  {color: theme.colors.gray},
    gray3: {color: theme.colors.gray3},

    // font style 
    abold : {fontFamily: 'Ambit-bold'},
    alight : {fontFamily: 'Ambit-light'},
    aregular : {fontFamily: 'Ambit-regular'},
    asemi_bold : {fontFamily: 'Ambit-semi-bold'},

    // font size
    h1: {fontSize: theme.fonts.h1},
    h2: {fontSize: theme.fonts.h2},
    h3: {fontSize: theme.fonts.h3},
    caption: {fontSize: theme.fonts.caption},

});