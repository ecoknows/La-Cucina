import React from 'react';
import View from './View';
import { StyleSheet } from 'react-native';
import { theme } from '../constants';

const Circle = props => {

    const {
        style,
        children,

        size,
        primary,
        ...rest
    } = props;

    const circleStyle = [
        style,
        styles.circle,

        primary && styles.primary,
        size &&  { width: size, height: size, borderRadius: size}

    ]

    return(
        <View flex={false} style={circleStyle} {...rest}>
            {children}
        </View>
    );
}

export default Circle;

const styles = StyleSheet.create({
    circle: {
        width: 5,
        height: 5,
        borderRadius: 5,
        backgroundColor: 'red'
    },

    primary: { backgroundColor: theme.colors.accent}
});