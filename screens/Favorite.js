import React, {useState, useEffect, useRef} from 'react';
import { View,Text, Pic, List } from '../components';
import CirclePercent from '../svg/CirclePercent';
import {Animated,Easing, Dimensions} from 'react-native';
import { theme } from '../constants';


const orange ={
    start : '#FF7B36',
    middle : '#FFAD63',
    end : '#FF7B36',
}

const green ={
    start : '#1BAA09',
    middle : '#78F032',
    end : '#1BAA09',
}
const blue ={
    start : '#005EE8',
    middle : '#AAC0FF',
    end : '#005EE8',
}


const dataTest = [
    'Eco',
    'Pogi',
    'Pogi',
    'Pogi',
    'Pogi',
    'Pogi',
    'Pogi',
]
const { width } = Dimensions.get('window');

function FavoriteList(props){
    
    const scrollX = useRef(new Animated.Value(0)).current;

    const ListView = (props) =>{
        const {item, index} = props;
        const stepPosition = Animated.divide(scrollX,100);
        const sizeChange = stepPosition.interpolate({
            inputRange: [index-1,index,index+1],
            outputRange: [width-(width*0.6),width-(width*0.5),width-(width*0.6)],
            extrapolate: 'clamp',
        })
        return(
            <View flex={false} >
                <Pic
                    animated
                    src={require('../assets/foods/corned-beef-omelette.png')}
                    size={[sizeChange,sizeChange]}
                />
            </View>
        );
    }

    return(
        <List 
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index})=> <ListView item={item} index={index}/>}
            keyExtractor={(item,index)=> index.toString()}
            data={dataTest}
            onScroll={
                    
                Animated.event([{
                    nativeEvent: {contentOffset: {x: scrollX}}
                }])
            }
        />
    );
}

function Favorite({navigation}){
    const animated = useRef(new Animated.Value(0)).current;

    
    return(
        <View white middle center paddingTop={theme.sizes.padding*2}>
            <View>
                <FavoriteList/>
            </View>
            <View flex={1} row>
                <CirclePercent size={-30} name='KCal' rotate='0deg' percent={0.5} textSize={18} textColor='#FF6600' gradient={orange} />
                <CirclePercent size={-30} name='Fats' rotate='-140deg' percent={0.25} textSize={18} textColor='#1BAA09' gradient={green} />
                <CirclePercent size={-30} name='Iron' rotate='90deg' percent={0.75} textSize={18} textColor='#0269FF' gradient={blue} />
            </View>
            
        </View>
    );
}

export default Favorite;
