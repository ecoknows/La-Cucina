import React from 'react';
import { View, Text, Card, Circle,  } from '../components';
import {StyleSheet,TouchableOpacity} from 'react-native';
import { theme } from '../constants';

function InfoModal({navigation, route}){
    const { info, button, exit, callback} = route.params;


    const modalPress = (item) => {
        if(item.navigate == null){
            navigation.goBack();
        }else{
            if(callback != null){
                callback[0].value = callback[1];
            }
            navigation.navigate(item.navigate,{
                modal: item.purpose
            });
        }
    }

    return(
            <View style={styles.container} >
                <Card columVerse borderColor={theme.colors.accent} borderWidth={2} flex={false} white 
                      round={20} paddingX={[15,15]} paddingY={[15,10]}
                      >
                    <View  paddingY={[20]} flex={false} row style={{alignSelf:'flex-end'}}>
                        {
                            button.map((item, index)=>{
                                return(
                                    <View key={index.toString()} row flex={false} paddingX={[10]}> 
                                        <Text tFlex={0} touchable accent family='bold' press={()=>modalPress(item)} >{item.title}</Text>
                                    </View>
                                );
                            })
                        }
                    </View>
                   
                    <Text accent family='semi-bold' size={15} >{info.text}</Text>
                    {
                    exit?
                    <TouchableOpacity  style={{position: 'absolute',alignSelf: 'flex-end', top: -5, right: -7}} 
                        onPress={()=> navigation.goBack()}
                    >
                        <Circle size={25} white borderColor={theme.colors.accent} borderWidth={2} center middle>
                            <Text accent family='bold' size={15}>X</Text>
                        </Circle>
                    </TouchableOpacity>
                    : null
                    }
                </Card>
            </View>
    );
}


export default InfoModal;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});