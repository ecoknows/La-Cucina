import React, { useState, useRef, forwardRef, useEffect } from 'react';
import { View, Text, List, Card, Pic, Shadow, Circle, Heart, Loading } from '../components';
import { StyleSheet, Animated, Dimensions,TouchableOpacity  } from 'react-native';
import { theme, tabs, mocks } from '../constants';


const { height, width} = Dimensions.get('window');
let swipeTO = null;
let timeOut = null;
let isSwipe = false;
let currentMiddle = 0;

const causineTabs  = tabs.cuisine.uppedTabs; // upper tabs 


function Middle (props){
    const [hColor, setHColor] = useState('white'); 
    const [cColor, setCColor] = useState(theme.colors.accent); 
    const { item, index, navigation, middleListRef, mocks_tabs} = props;
        
    let x = 30;
    
    if(index == 0){
        x = 35;
    }else if( index == 1){
        x = 20
    }

    
    
    const middleClick =()=>{
        if(currentMiddle != index ){
            middleListRef.current.scrollToIndex({index , animated: true });
            currentMiddle = index;
        }else{
            item.mocks_tabs = mocks_tabs;
            navigation.navigate('CuisineSelected', {item})
        }
    }
    
    const shadowOpt = {
        width: width - (width * .35) ,
        height: height - (height * .45),
        color:"#000",
        border:20,
        radius:30,
        opacity:0.10,
        x:35,
        y:50,
    }

    return(
        <View
            touchable
            activeOpacity={1}
            onPress={()=> middleClick()}
            marginY={[0,10]}
            size={[width - (width * .20), '100%']}
            >
                
            <Shadow setting={shadowOpt}>

            <Card
                round={32}
                color={item.color}
                style={{flex:0}}
                marginY={[10]}
                marginX={[10]}
                size={[width - (width * .30),height - (height * .40)]}>
                    
            <View flex={1}>
                <TouchableOpacity activeOpacity={1} style={{position: 'absolute',alignSelf: 'flex-end'}}
                    onPress={()=> navigation.navigate('ImageModal',{image: item.image})}
                >    
                    <Pic 
                        right={-30}
                        resizeMode='contain'
                        size={[item.image_scale,item.image_scale]}
                        src={item.image} />
                </TouchableOpacity>

            </View>

            <View paddingX={[theme.sizes.padding * 2,theme.sizes.padding * 2]} flex={1.1} paddingBottom={10}>
                
                <View flex={false}  marginX={[10, 0]}>
                    
                    <View flex={false} row marginY={[12]}>
                        <Circle size={10} primary marginY={[12]}/>

                        <Text size={item.title_size} family='semi-bold' left={8}>
                            {item.name}
                        </Text>

                    </View>
                    

                </View>

                
                <Text size={13} thirdary top={10} style={{flex: 1}}>
                    {item.description} 
                </Text>

            </View>


            </Card>


            </Shadow>

            <View absolute style={{top:0}}>
                <Shadow setting={{
                    width: 20,
                    height: 20,
                    color:theme.colors.accent,
                    border:20,
                    radius:10,
                    opacity:0.5,
                    x: 20,
                    y: 24,
                }}>
                <Circle center touchable middle color={cColor} size={50}
                    press={()=>{
                        if(!item.favorite){
                            setHColor('red'); setCColor('#FFEF8D') 
                            item.favorite = true;
                        }else{
                            setHColor('white'); setCColor(theme.colors.accent) 
                            item.favorite = false;
                        }
                    }}
                    >
                    <Heart size={2} color={hColor} />
                </Circle>
                </Shadow>
            </View>
            
        </View>
    );
}

function Left (props){
    const [isActive , setIsActive] = useState('Rice');
    const { setLeftActive } = props;

    useEffect(()=>{
        setLeftActive(isActive)
    }, [isActive]);
    const leftTabs = tabs.cuisine.leftTabs.breakfast;

    return(
        leftTabs.map((tab) => {
            const active = isActive == tab.name;
            const isIndi = active ?  <Circle size={5} color={theme.colors.accent} style={{alignSelf: 'center',marginLeft: tab.margin}}/>  : null;
            
            return(
                <View  
                key={tab.name} flex={false} style={{flexDirection: 'column-reverse'}} >
                    
                    <TouchableOpacity 
                        onPress={()=> setIsActive(tab.name)}
                        style={{flexDirection: 'column-reverse'}}>

                      <Text secondary={!active} right={30} rotate={180} family='semi-bold' size={16} style={{width: tab.width}} >{tab.name}</Text>
                      {isIndi}

                    </TouchableOpacity>
                
                </View>
            );
        })
    );

}

function Top(props){
    const { item, index, topScrollX, listRef} = props;
    const { width, first, second, light } = item;

    
    const topClick =(item,index)=>{
        if(!isSwipe){
            listRef.current.scrollToIndex({index , animated: true });
        }
    }
    

    const position = Animated.divide(topScrollX,width);
    const textSize =  position.interpolate({
        inputRange : [
            index - 1,
            index ,
            index + 1,
        ],
        outputRange : [
            theme.fonts.h3,
            theme.fonts.h1,
            theme.fonts.h3,
        ],
        extrapolate: 'clamp',
    })
    const opacity =  position.interpolate({
        inputRange : [
            index - 1,
            index ,
            index + 1,
        ],
        outputRange : [
            0.3,
            1,
            0.3,
        ],
        extrapolate: 'clamp',
    })
    return (
            <Text
            animated
            size={textSize}
            light={light}
            end
            onPress={() => topClick(item, index)}
            left={theme.sizes.padding * 2}
            opacity={opacity}
            bottom={5}>
            {first}
                <Text bold>{second}</Text>
            </Text>
        
    );
}

function Bottom(props){
    const [ isActive, setIsActive] = useState('Veggies');
    const { setBottomActive, data } = props;

    useEffect(()=>{
        setBottomActive(isActive)
    }, [isActive]);

    const BottomItem = (props) =>{
        
        const { item, } = props;
        const active = isActive === item.name;

        return(
            <Card marginX={[10]} center middle size={[70,70]} round={20} accent={active} gray2={!active}
                    touchable showOpacity={1} 
                    press={()=> setIsActive(item.name)}
                    >
                <Text white={active} size={14} family='bold' gray={!active} >{item.name}</Text>
            </Card>
        );
    }

    return(
        
        <List 
        horizontal
        data={data}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item,index }) =>  
        <BottomItem item={item} index={index} bottom={isActive} setBottom={setIsActive}/>
        }
        keyExtractor={item => item.name}
        contentContainerStyle={{paddingEnd: 10}}
        size={[50,50]}

        />
    );


}


function Cuisine({navigation}){
    const listRef = useRef();
    const middleListRef = useRef();

    const topScrollX = new Animated.Value(0);
    const midScrollX = new Animated.Value(0);

    const [ isCurrent, setIsCurrent] = useState(0); // index of current mocks data


    const [ leftActive, setLeftActive] = useState('Rice');
    const [ bottomActive, setBottomActive] = useState(causineTabs[0].bottomTabs[0].name);
    
    const CurrentCausine = () => {
        const cuisine = causineTabs[isCurrent].mocks;

        let filtered = cuisine.filter( 
            cuisine => cuisine.tags.includes(leftActive.toLowerCase())
        )

        filtered = filtered.filter( 
            cuisine => cuisine.tags.includes(bottomActive.toLowerCase())
        )
        
        return filtered;
    }
    
    const middleCuisine = CurrentCausine();
    useEffect(()=>{
        if(middleCuisine.length != 0)
            middleListRef.current.scrollToIndex({index : 0, animated: true });
    },[bottomActive]);

    const leftOpacity = midScrollX.interpolate({
        inputRange: [0, 80],
        outputRange: [1,0],
        extrapolate: 'clamp'
    });

    const getTopItemLayout = (data, index) => {
        const size = [
             100
            ,140
            ,130
            ,135
            ,129
            ,119
            ,118
            ,118
            ,118]
        return {length: 10, width: size[index],offset: size[index] * index, index }
    }

    const getMiddleItemLayout =(data, index) =>{
        let size = width - (width * .20);
    
        return  { length: 10, width: size, offset: size * index, index }
    }

    
    return(
        <View animated white style={styles.container}>
            
            <View flex={0.6} >
                    
                <List
                    horizontal
                    data={tabs.cuisine.uppedTabs}
                    ref={listRef}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) => <Top item={item} index={index} topScrollX={topScrollX} listRef={listRef} />}
                    contentContainerStyle={{paddingEnd : 240}}
                    getItemLayout={getTopItemLayout}
                    
                    onScroll={
                        Animated.event(
                            [{nativeEvent: {contentOffset: {x: topScrollX}},}],
                            {
                                listener: event => {
                                    const offsetX = Math.floor(event.nativeEvent.contentOffset.x / 100);
                                    isSwipe = true;

                                    if(swipeTO != null)
                                        clearTimeout(swipeTO);
                                    
                                    swipeTO = setTimeout(() => {
                                        isSwipe = false;
                                    }, 10);
                                

                                    if(timeOut != null)
                                        clearTimeout(timeOut);
                                        
                                    if(offsetX != isCurrent ){
                                        timeOut = setTimeout(() => {
                                            setIsCurrent(offsetX);
                                        }, 1);
                                    }
                                }
                            }
                        )
                    }
                />
            </View>

            <View row flex={6} 
                >
                <View animated center flex={false} paddingY={[0,30]} size={[0.1]} opacity={leftOpacity}>

                <View
                center flex={false} rotate={90} rowVerse paddingY={[0,10]} left={25} > 
                    <Left setLeftActive={setLeftActive} />
                </View>
                
                </View>


                <View flex={1} >
                    <List 
                        horizontal
                        initialNumToRender={2}
                        ref={middleListRef}
                        data={middleCuisine}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item, index }) =>  <Middle middleListRef={middleListRef} item={item} index={index} navigation={navigation} mocks_tabs={isCurrent}/>}
                        keyExtractor={item => item.id}
                        contentContainerStyle={{paddingStart : 40, paddingEnd: 40}}
                        getItemLayout={getMiddleItemLayout}
                        
                        
                        onScroll={
                            Animated.event(
                                [{nativeEvent: {contentOffset: {x: midScrollX}}}],
                                {
                                    listener: event => {
                                        const x = event.nativeEvent.contentOffset.x / (width - (width * .20));
                                        const offsetX = Math.floor(x);
                                        currentMiddle = offsetX;
                                        if(x % 1 > 0.05){
                                            currentMiddle = -1;
                                        }

                                    }
                                }
                            )
                        }
                    />
                </View>

            </View>


            <View end flex={1.2} paddingX={[0,0]}>
                <Bottom setBottomActive={setBottomActive}
                    data={causineTabs[isCurrent].bottomTabs}
                />

            </View>
            
        </View>
    );

    
}

export default Cuisine;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50 ,
    }, 
    list: {
        width: '100%',
        flexGrow: 0,
    },
});