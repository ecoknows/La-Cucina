import React from 'react';
import { View, StyleSheet } from 'react-native';

const Heart = props => {

    const { size, color } = props;

    const heartPiece = {
        width: 6 * size,
        height: 9 * size,
        position: 'absolute',
        top: 0,
        borderTopLeftRadius: 3 * size,
        borderTopRightRadius: 3 * size,
        backgroundColor: color,
    };



    return(
        <View  style={[
            {
                width: 10 * size,
                height: 10 * size,
                backgroundColor: 'transparent',
            },
        ]}>

                <View  style={[
                        {
                            transform: [{ rotate: '-45deg' }],
                            left: 0.9 * size,
                        },
                        heartPiece,
                    ]}/>

                <View 
                 style={[
                    {
                        transform: [{ rotate: '45deg' }],
                        right: 0.9 * size,
                    },
                    heartPiece,
                ]} />
        </View>
    );

}


export default Heart;