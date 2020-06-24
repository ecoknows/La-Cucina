import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { theme } from '../constants';

const Input = props => {
    
    const {  
    style,

    family,
    h1,
    h2,
    h3,
    caption,
    body,
    b1,

    white,

    
    hint,
    hintColor,

    ...rest
    } = props;

    const inputStyles = [
        style,
        styles.input,

        
        family && { fontFamily: `OpenSans-${family}`},
        
        // font size
        h1 && styles.h1,
        h2 && styles.h2,
        h3 && styles.h3,
        caption && styles.caption,
        body && styles.body,
        b1 && styles.b1,

        // color 
        white && styles.white,


    ];

    return(
        <TextInput style={inputStyles} 
            placeholder={hint} 
            placeholderTextColor={hintColor}
            {...rest} />
    );

}

export default Input;

const styles = StyleSheet.create({
    input: {
        fontFamily: 'OpenSans-semi-bold',
    },
    

    // colors
    white: { color: theme.colors.white },


    h1: {fontSize: theme.fonts.h1},
    h2: {fontSize: theme.fonts.h2},
    h3: {fontSize: theme.fonts.h3},
    caption: {fontSize: theme.fonts.caption},
    body: {fontSize: theme.fonts.body},
    b1: {fontSize: theme.fonts.b1},
});