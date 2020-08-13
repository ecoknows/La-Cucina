import React, {useState, useEffect, useRef} from 'react';
import { View,Text, Pic, List } from '../components';
import CirclePercent from '../svg/CirclePercent';
import {Animated,Easing, Dimensions} from 'react-native';
import { theme } from '../constants';

let swipeTO = null;
let timeOut = null;
let isSwipe = false;
let currentTop = 0;

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
    {
        name: 'Hot Silog',
        preparation: '20 mins',
        cooking: '5 mins',
        people: '1 people',
        kCal: 50,
        iron: 50,
        fats: 50,
        info: 'Hotsilog is a meal composed of hotdogs,'+
        ' garlic fried rice, and fried egg. '+
        'In a Filipino household, this is'+
        ' commonly eaten for breakfast',
        image: require('../assets/foods/hot_silog.png'),
    }, 
    {
        name: 'T-Bone Steak With Fried Egg',
        preparation: '8 mins',
        cooking: '15 mins',
        kCal: 32,
        iron: 21,
        fats: 43,
        info:'Note that this recipe calls for '+
        'T-bone steak, but you can also use Porterhouse'+
        ' or any steak cuts that you like. Both T-bone and Porterhouse steaks can'+
        ' be distinguished by the “T” shaped bone. However, each '+
        'has its own properties that make it unique.',
        people: '2 people',
        image: require('../assets/foods/t-bone-steak-with-fried-eggs.png'),
    },
     {
        name: 'Tap Silog',
        preparation: '30 mins',
        cooking: '10 mins',
        kCal: 32,
        iron: 5,
        fats: 75,
        info: 'One of the most common breakfast staples in'+
        ' the Philippines is tapsilog, a plate which consists of'+
        ' sliced beef jerky, known as tapa, a heap of garlic rice,'+
        ' and a fried egg.',
        people: '1 people',
        image: require('../assets/foods/tapsilog.png'),
    },
]
const { width } = Dimensions.get('window');

function FavoriteList(props){
    const {current,setCurrent} = props;
    const scrollX = useRef(new Animated.Value(0)).current;
    const getMiddleItemLayout =(data, index) =>{
        let size = width-(width*0.6);
    
        return  { length: 10, width: size, offset: size * index, index }
    }

    const ListView = (props) =>{
        const {item, index} = props;
        const {image} = item;
        const stepPosition = Animated.divide(scrollX,width - (width * .6));
        const sizeChange = stepPosition.interpolate({
            inputRange: [index-1,index,index+1],
            outputRange: [width-(width*0.6),width-(width*0.5),width-(width*0.6)],
            extrapolate: 'clamp',
        })
        return(
            <View flex={false} >
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
                            const offsetX = Math.floor(x);

                            if(!((x % 1 > 0.05 && x % 1 < 0.5 ) || (x % 1 > 0.60))){
                                
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
                                    }, 1);
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

    const CuisineInfo =props=>{
        return(
            <View middle flex={false}>

                <Text family='semi-bold' color='#8F8F8F' size={16} marginBottom={5}>{dataTest[current].name}</Text>
                <View flex={false} row>
                    <Pic
                        src={require('../assets/images/chopping-knife.png')}
                        size={[25,25]}
                        marginRight={5}
                    />
                    <Text end asemi_bold size={14} thirdary>{dataTest[current].preparation}</Text>
                    <Text end asemi_bold size={13} gray3> preparation</Text>
                    <Pic
                        accent
                        src={require('../assets/images/time.png')}
                        size={[25,25]}
                        marginRight={5}
                        marginLeft={5}
                    />
                    <Text end asemi_bold size={14} thirdary>{dataTest[current].cooking}</Text>
                    <Text end asemi_bold size={13} gray3> cooking</Text>
                </View> 
                <View row flex={false}>
                    <Pic
                            accent
                            src={require('../assets/images/people.png')}
                            size={[25,25]}
                            marginRight={5}
                        />
                    <Text end asemi_bold size={14} thirdary>{dataTest[current].people}</Text>
                </View>
            </View>
        )
    }
    const QuickInfo =props=>{
        const { current } = props;
        return(
            <View flex={false}>
                <Text color='#FF6600' family='extra-bold' size={25} bottom={10} top={10}>Quick Info</Text>
        <Text color='#727272' size={14}>{dataTest[current].info}</Text>
            </View>
        );
    }
    return(
        <View white paddingTop={theme.sizes.padding*2}>
            <View flex={1.2}>
                <FavoriteList current={current} setCurrent={setCurrent}/>
            </View>
            <View flex={false}>
                <CuisineInfo />
            </View>
            <View flex={1} paddingHorizontal={20}paddingBottom={20}>
                <QuickInfo current={current}/>
            </View>
            <View flex={false} paddingHorizontal={16} >
                <View flex={false} row>
                    <CirclePercent size={-30} name='KCal' rotate='-120deg' percent={dataTest[current].kCal/100} textSize={18} textColor='#FF6600' gradient={orange} />
                    <View flex={false} absolute right={5}>
                         <CirclePercent size={-30} name='Fats' rotate='0deg' percent={dataTest[current].fats/100} textSize={18} textColor='#1BAA09' gradient={green} />
                    </View>
                </View>
                <View flex={false} marginTop={-40}>
                    <CirclePercent size={-30} name='Iron' rotate='120deg' percent={dataTest[current].iron/100} textSize={18} textColor='#0269FF' gradient={blue} />
                </View>
            </View>
            
        </View>
    );
}

export default Favorite;
