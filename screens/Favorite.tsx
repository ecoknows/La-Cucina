import React, {useState, useEffect} from 'react';
import { View,Text, Pic } from '../components';
import CirclePercent from '../svg/CirclePercent';

function Favorite({navigation}){
    return(
        <View white>
            <CirclePercent/>
        </View>
    );
}

export default Favorite;
