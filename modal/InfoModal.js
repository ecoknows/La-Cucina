import React from 'react';
import { View, Text, Card } from '../components';
import {StyleSheet} from 'react-native';
import { theme } from '../constants';

function InfoModal({navigation}){
    
    navigation.setOptions({
        animationEnabled: false,
        headerShown: false,
        cardStyle: {backgroundColor: 'rgba(226,67,9,0.25)'},
        cardOverlayEnabled: true,
    });
    return(
            <View style={styles.container}>
                <Card borderColor={theme.colors.accent} borderWidth={2} flex={false} white size={['60%','15%']} round={20} paddingX={[15,15]} paddingY={[15,10]}>
                    <Text accent family='semi-bold' size={15} >Make sure your ingredients are ready ^_^ </Text>
                    <View row flex={false} style={{alignSelf:'flex-end',marginTop: 20}}> 
                        <Text tFlex={0} touchable accent family='bold' press={()=> navigation.goBack()} >Ok</Text>
                    </View>
                </Card>
            </View>
    );
}


export default InfoModal;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
});