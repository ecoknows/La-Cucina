import React, {useState, useEffect} from 'react';
import {StyleSheet, Animated} from 'react-native';
import { View,Text, Pic } from '../components';


function Favorite({navigation}){
    
    return(
        <View white>
            <View>
                    
                <Pic
                    src={require('../assets/favorite_assets/butterfly.png')}
                    size={[120,120]}
                />
                <Pic
                    end
                    absolute
                    src={require('../assets/favorite_assets/coffee.png')}
                    size={[120,220]}
                />
            
            </View>
            <View>
                    
                <Pic
                    end
                    src={require('../assets/favorite_assets/circle.png')}
                    size={[200,300]}
                />
                
            </View>
        </View>
    )
}

export default Favorite;
