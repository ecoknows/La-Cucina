import React from 'react';
import { StyleSheet, } from 'react-native';
import { View, Pic } from '../components';

function ImageModal({navigation, route}){
    const {image} = route.params;
    return(
        <View touchable activeOpacity={1} style={styles.container} press={()=> navigation.goBack()}>
                <Pic
                    resizeMode='contain'
                    src={image}
                    size={['90%','90%']}
                />
        </View>
    )
}

export default ImageModal;


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});