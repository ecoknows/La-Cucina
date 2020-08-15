import React, {useState, useEffect, useRef} from 'react';
import { View,Text, Pic, List } from '../components';
import CirclePercent from '../svg/CirclePercent';
import {Animated,Easing, Dimensions, PanResponder} from 'react-native';
import { theme, tabs } from '../constants';
import { TouchableOpacity } from 'react-native-gesture-handler';

let swipeTO = null;
let timeOut = null;
let isSwipe = false;
let currentTop = 0;
let offsetX = 0;

const dataTest = [
    {
        tabsIndex: 0,
        mocksIndex: 6,
    }, 
    
    {
        tabsIndex: 0,
        mocksIndex: 8,
    }, 
    {
        tabsIndex: 0,
        mocksIndex: 4,
    }, 
    {
        tabsIndex: 0,
        mocksIndex: 5,
    }, 
    {
        tabsIndex: 0,
        mocksIndex: 7,
    }, 
]
const { width } = Dimensions.get('window');

function FavoriteList(props){
    const {current,setCurrent, navigation} = props;
    const scrollX = useRef(new Animated.Value(0)).current;
    const listRef = useRef();
    const getMiddleItemLayout =(data, index) =>{
        let size = width-(width*0.6);
    
        return  { length: 10, width: size, offset: size * index, index }
    }

    const ListView = (props) =>{
        const {item, index} = props;
        
        const tabsIndex = item.tabsIndex;
        const mocksIndex = item.mocksIndex;
        const mocksData = tabs.cuisine.uppedTabs[tabsIndex].mocks[mocksIndex];
        const {image} = mocksData;


        const stepPosition = Animated.divide(scrollX,width - (width * .6));
        const sizeChange = stepPosition.interpolate({
            inputRange: [index-1,index,index+1],
            outputRange: [width-(width*0.6),width-(width*0.5),width-(width*0.6)],
            extrapolate: 'clamp',
        })
        return(
            <View flex={false} touchable activeOpacity={1} onPress={()=>{
                if(offsetX != index){
                    listRef.current.scrollToIndex({index, animated: true });
                }else{
                    navigation.navigate('CuisineSelected', {item: mocksData});
                }
                }}
                > 
                <Pic
                        animated
                        src={image}
                        size={[sizeChange,sizeChange]}
                />
            </View>
        );
    }

    return(
        <List 
            horizontal
            ref={listRef}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingHorizontal: 100}}
            renderItem={({item, index})=> <ListView item={item} index={index}/>}
            keyExtractor={(item,index)=> index.toString()}
            data={dataTest}
            getItemLayout={getMiddleItemLayout}
            onScroll={
                Animated.event(
                    [{nativeEvent: {contentOffset: {x: scrollX}}}],
                    {
                        listener: event => {

                            const x = event.nativeEvent.contentOffset.x / (width - (width * .60));
                            offsetX =Math.floor(x);
                            //console.log(x);
                            if(x%1 > 0.0 &&  x%1 < 0.1){
                                isSwipe = true;
                                if(swipeTO != null)
                                    clearTimeout(swipeTO);
                                    
                                swipeTO = setTimeout(() => {
                                    isSwipe = false;
                                }, 10);
                                
                                if(timeOut != null)
                                clearTimeout(timeOut);
                                
                                if(offsetX != current ){
                                    timeOut = setTimeout(() => {
                                        setCurrent(offsetX == -1 ? 0 : offsetX);
                                    }, 500);
                                }
                            }
                        }
                    }
                )
            }
        />
    );
}


function Favorite({navigation}){
    const animated = useRef(new Animated.Value(0)).current;
    const [current, setCurrent] = useState(0);
    const tabsIndex = dataTest[current].tabsIndex;
    const mocksIndex = dataTest[current].mocksIndex;
    const mocksData = tabs.cuisine.uppedTabs[tabsIndex].mocks[mocksIndex];

    const CuisineInfo =props=>{
        return(
            <View middle flex={false}>

                <Text family='semi-bold' color='#8F8F8F' size={16} bottom={5}>{mocksData.name}</Text>
                <View flex={false} row>
                    <Pic
                        src={require('../assets/images/chopping-knife.png')}
                        size={[25,25]}
                        marginRight={5}
                    />
                    <Text end asemi_bold size={14} thirdary>{mocksData.prep_time}</Text>
                    <Text end asemi_bold size={13} gray3> preparation</Text>
                    <Pic
                        accent
                        src={require('../assets/images/time.png')}
                        size={[25,25]}
                        marginRight={5}
                        marginLeft={5}
                    />
                    <Text end asemi_bold size={14} thirdary>{mocksData.cooking_time}</Text>
                    <Text end asemi_bold size={13} gray3> cooking</Text>
                </View> 
                <View row flex={false}>
                    <Pic
                            accent
                            src={require('../assets/images/people.png')}
                            size={[25,25]}
                            marginRight={5}
                        />
                    <Text end asemi_bold size={14} thirdary>{mocksData.capacity} people</Text>
                </View>
            </View>
        )
    }
    const QuickInfo =props=>{
        const { current } = props;
        return(
            <View flex={false}>
                <Text color='#FF6600' family='extra-bold' size={25} bottom={10} top={10}>Quick Info</Text>
        <Text color='#727272' size={14}>{mocksData.description}</Text>
            </View>
        );
    }
    return(
        <View white paddingTop={theme.sizes.padding*2}>
            <View flex={1.2}>
                <FavoriteList current={current} setCurrent={setCurrent} navigation={navigation}/>
            </View>
            <View flex={false}>
                <CuisineInfo />
            </View>
            <View flex={1} paddingHorizontal={20}paddingBottom={20}>
                <QuickInfo current={current}/>
            </View>
            <View flex={false} paddingHorizontal={16} >
                <View flex={false} row>
                    <CirclePercent size={-30} name={mocksData.circle_1.name} rotate={mocksData.circle_1.degree} percent={mocksData.circle_1.percent/100} textSize={18} textColor={mocksData.circle_1.textColor} gradient={mocksData.circle_1.gradient} />
                    <View flex={false} absolute right={5}>
                         <CirclePercent size={-30} name={mocksData.circle_3.name} rotate={mocksData.circle_3.degree} percent={mocksData.circle_3.percent/100} textSize={18} textColor={mocksData.circle_2.textColor} gradient={mocksData.circle_3.gradient} />
                    </View>
                </View>
                <View flex={false} marginTop={-40}>
                    <CirclePercent size={-30} name={mocksData.circle_2.name} rotate={mocksData.circle_3.degree} percent={mocksData.circle_2.percent/100} textSize={18} textColor={mocksData.circle_3.textColor} gradient={mocksData.circle_2.gradient} />
                </View>
            </View>
            
        </View>
    );
}

export default Favorite;
