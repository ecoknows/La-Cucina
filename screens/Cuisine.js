import React, { useState, useRef, forwardRef, useEffect } from 'react';
import { View, Text, List, Card, Pic, Shadow, Circle, Heart, Loading } from '../components';
import { StyleSheet, Animated, Dimensions, PanResponder  } from 'react-native';
import { theme, tabs, mocks } from '../constants';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { SnapShotListiner } from '../database/database';
import { FavoriteDataUpdate, GetAllFavorite } from '../database/cuisine';

import { duration } from 'moment';
import { Easing, event, set } from 'react-native-reanimated';

const { height, width} = Dimensions.get('window');
let swipeTO = null;
let timeOut = null;
let isSwipe = false;
let currentMiddle = 0;


const causineTabs  = tabs.cuisine.uppedTabs; // upper tabs 

let isTutorial = false;
let tutorialLevel = -1, swipeTut = true;
let TutDelayTime = 1000, tutStart = false;

const TUTORIAL = 0;
function TutorialFinger(props){
    const animated = useRef(new Animated.Value(1.1)).current;
    const swipe_animated = useRef(new Animated.Value(0)).current;
    let circle_trans = null;
    const { swipe, tap } = props;
    let picstyle = null;
    if(tap){
        picstyle = {transform: [{scale: animated}]};
        const animatedStart =()=> {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(animated,{
                        toValue: 1,
                        duration: 1000,
                    }),
                    Animated.timing(animated,{
                        toValue: 1.1,
                        duration: 1000,
                    })
                ])
            ).start();
        }
        animatedStart();
    }
    if(swipe){

        picstyle = {transform: [{ translateX: swipe_animated},{scale: animated}]};
        circle_trans = {transform: [{translateX: swipe_animated}]}
        const animatedStart =()=> {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(animated,{
                        toValue: 1,
                        duration: 1000,
                    }),
                    Animated.timing(swipe_animated,{
                        toValue: -100,
                        duration: 3000,
                    }),
                    
                    Animated.timing(animated,{
                        toValue: 1.1,
                        duration: 1000,
                    }),
                ])
            ).start();
        }
        animatedStart();
    }
    return(
        <View flex={false} absolute style={props.style}>
            { tap || swipe? <Circle size={40}
             absolute animated style={[circle_trans,{
                
                top: -10,
                left: 5,
                opacity: animated.interpolate({
                    inputRange: [1,1.1],
                    outputRange: [0.1,0],
                    extrapolate: 'clamp'
                })
            }]}/>:null}
            <Pic
            animated
            style={picstyle}
            src={require('../assets/icons/tutorial_finger.png')}
            size={[70,70]}
            />
        </View>
    )
}

const ProceedTutorial =(navigation)=>{
    navigation.navigate('InfoModal',{info: 
        {
        text: theme.tutorial_info.cuisine[tutorialLevel+1]
        }, 
        button: [
            {
                title: 'Ok',
                navigate: 'Cuisine',
                purpose: TUTORIAL,
            },
            ],  
        exit: false,
    });
}


function Middle (props){ 
    const { item, index, navigation, middleListRef, mocks_tab, mainRefresh, setMainRefresh} = props;
    const { recipe } = item;
    let hColor = null;
    let cColor = null;
    const [refresh, setRefresh] = useState(true);
    let x = 30;

    if(!recipe.favorite){
        hColor = 'white';
        cColor = theme.colors.accent;
    }else{
        hColor = 'red';
        cColor = '#FFEF8D';
    }
    
    if(index == 0){
        x = 35;
    }else if( index == 1){
        x = 20
    }

    
    
    const middleClick =()=>{
        if(isTutorial && tutorialLevel != 8){
            //setMainRefresh(!mainRefresh);
            return;
        }
        if(currentMiddle != index ){
            middleListRef.current.scrollToIndex({index , animated: true });
            currentMiddle = index;
        }else{
            recipe.mocks_tabs = mocks_tab;
            navigation.navigate('CuisineSelected', {item: recipe, index: item.index, cuisineTutorial: isTutorial})
                
            if(isTutorial && tutorialLevel == 8){
                isTutorial = false;
                tutorialLevel = -1;
                setMainRefresh(!mainRefresh);
            }
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
                color='#FFDFC4'
                style={{flex:0}}
                marginY={[10]}
                marginX={[10]}
                size={[width - (width * .30),height - (height * .40)]}>
                    
            <View flex={1}>
                <View touchable activeOpacity={1} flex={false} absolute end
                    press={()=>{
                        if(isTutorial && tutorialLevel == 6){
                            setTimeout(()=>{
                                ProceedTutorial(navigation);
                            }, TutDelayTime/2);
                        }
                        if(currentMiddle == index)
                            navigation.navigate('ImageModal',{image: recipe.image});
                        else
                            middleClick();
                    }}
                >
                <Pic 
                    right={-30}
                    size={[recipe.image_scale,recipe.image_scale]}
                    src={recipe.image} />

                </View>

            </View>

            <View paddingX={[theme.sizes.padding * 2,theme.sizes.padding * 2]} flex={1.1} paddingBottom={10}>
                
                <View flex={false}  marginX={[10, 0]}>
                    
                    <View flex={false} row marginY={[12]}>
                        <Circle size={10} primary marginY={[12]}/>

                        <Text size={recipe.title_size}  asemi_bold left={8}>
                            {recipe.name}
                        </Text>

                    </View>
                    

                </View>

                
                <Text size={13} gray top={10} style={{flex: 1}}>
                    {recipe.description} 
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
                        if(isTutorial && tutorialLevel == 7){
                            ProceedTutorial(navigation);
                        }
                        if(!recipe.favorite){
                            FavoriteDataUpdate({
                                recipe_id: recipe.id,
                                tabsIndex: mocks_tab,
                                mocksIndex: item.index,
                            },true);
                            recipe.favorite = true;
                        }else{
                            FavoriteDataUpdate({
                                recipe_id:recipe.id,
                                tabsIndex: mocks_tab,
                                mocksIndex: item.index,
                            },false);
                            recipe.favorite = false;
                        }
                        setRefresh(!refresh);
                        SnapShotListiner.favorite = true;
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
    const { setLeftActive,navigation } = props;

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
                        onPress={()=> {
                            setIsActive(tab.name);
                            if(isTutorial && tutorialLevel == 2 && tab.name != active ){
                                ProceedTutorial(navigation);
                            }
                        }}
                        style={{flexDirection: 'column-reverse'}}>

                      <Text secondary={!active} right={30} rotate={180} asemi_bold size={16} style={{width: tab.width}} >{tab.name}</Text>
                      {isIndi}

                    </TouchableOpacity>
                
                </View>
            );
        })
    );

}

function Top(props){
    const { item, index, topScrollX, listRef, setRefresh, refresh, navigation} = props;
    const { width, first, second, light } = item;

    
    const topClick =(item,index)=>{
        if(!isSwipe){
            listRef.current.scrollToIndex({index , animated: true });
        }
        console.log(tutorialLevel,isTutorial,swipeTut);
        if(isTutorial && tutorialLevel == 1 && swipeTut){
            swipeTut = false;
            setTimeout(() => {
                ProceedTutorial(navigation);
                listRef.current.scrollToIndex({index:0 , animated: true });
            }, 2000);
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
            alight
            end
            onPress={() => topClick(item, index)}
            left={theme.sizes.padding * 2}
            opacity={opacity}
            bottom={5}>
            {first}
                <Text abold>{second}</Text>
            </Text>
        
    );
}

function Bottom(props){
    const [ isActive, setIsActive] = useState('Veggies');
    const { setBottomActive, data, setRefresh,refresh,navigation } = props;

    useEffect(()=>{
        setBottomActive(isActive)
    }, [isActive]);
      
    const BottomItem = (props) =>{
        
        const { item, index } = props;
        const active = isActive === item.name;
        return(
            <Card marginX={[10]} center middle size={[width - (width * 0.8),'75%']} round={20} accent={active} gray2={!active}
                 showOpacity={1} 
                 touchable
                 press={()=> {
                     setIsActive(item.name)
                     if(isTutorial && tutorialLevel == 4){
                        ProceedTutorial(navigation);
                     }
                    }}
                    >
                <Text white={active} size={Math.floor((width-(width * 0.8))*.2)-1} abold gray={!active} >{item.name}</Text>
                
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
        onScroll={
            isTutorial ? 
            ({event})=>{
                if(isTutorial && tutorialLevel == 3 && swipeTut ){
                    swipeTut = false;
                    setTimeout(()=>{
                        ProceedTutorial(navigation);
                    }, TutDelayTime);
                }
            } : null
        }
        
        />
    );


}


function Cuisine({navigation, route}){
    const listRef = useRef();
    const middleListRef = useRef();

    const topScrollX = new Animated.Value(0);
    const midScrollX = new Animated.Value(0);

    const [ isCurrent, setIsCurrent] = useState(0); // index of current mocks data
    const [refresh, setRefresh] = useState(false);

    const [ leftActive, setLeftActive] = useState('Rice');
    const [ bottomActive, setBottomActive] = useState(causineTabs[0].bottomTabs[0].name);
    
    const CurrentCausine = () => {
        const cuisine = causineTabs[isCurrent].mocks;
        let filtered = cuisine.filter( 
            cuisine => cuisine.recipe.tags.includes(leftActive.toLowerCase())
        )

        filtered = filtered.filter( 
            cuisine => cuisine.recipe.tags.includes(bottomActive.toLowerCase())
        )
        
        return filtered;
    }
    const middleCuisine = CurrentCausine();
    useEffect(()=>{
        if(middleCuisine.length != 0)
            middleListRef.current.scrollToIndex({index : 0, animated: true });
    },[bottomActive]);
    useEffect(()=>{
        GetAllFavorite(setRefresh, refresh);
        if(tutorialLevel == -1 && isTutorial)
            StartTutorial();
    },[]);

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

    
    if(route.params?.modal != undefined){
        switch(route.params.modal){
            case TUTORIAL: 
                if(tutorialLevel == -1 && !tutStart){
                    ProceedTutorial(navigation);
                    tutStart = true;
                }else{
                    tutorialLevel++;
                }
                swipeTut = true;
                break;
        }
        route.params.modal = undefined;
    }


    const StartTutorial =()=>{
        navigation.navigate('InfoModal',{info: 
            {
            text: 'Hello! there ^.^ \nbefore you start using the app\nyou will have a short tutorial.'
            }, 
            button: [
                {
                    title: 'Ok',
                    navigate: 'Cuisine',
                    purpose: TUTORIAL,
                },
                ],  
            exit: true,
            });
    }
    
    return(
        <View animated white style={styles.container}>
        {tabs.tutorial.current == 'Ingridients' && !isTutorial ? <TutorialFinger style={{left: width * 0.25,zIndex: 1,bottom: height * 0.02, transform:[{rotate: '180deg'}]}} tap/> : null}
        {tabs.tutorial.current == 'Favorite' && !isTutorial ? <TutorialFinger style={{left: width * 0.50,zIndex: 1,bottom: height * 0.02, transform:[{rotate: '180deg'}]}} tap/> : null}
        {tabs.tutorial.current == 'History' && !isTutorial ? <TutorialFinger style={{left: width * 0.75,zIndex: 1,bottom: height * 0.02, transform:[{rotate: '180deg'}]}} tap/> : null}
            <View flex={0.6} zIndex={1}>
                { (tutorialLevel == 0 || tutorialLevel == 1) && isTutorial ? <TutorialFinger style={{alignSelf: 'center', top: 30, zIndex: 1, right: 0}} swipe={tutorialLevel == 0} tap={tutorialLevel == 1}/> : null}
                <List
                    horizontal
                    data={tabs.cuisine.uppedTabs}
                    ref={listRef}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) => <Top item={item} index={index} topScrollX={topScrollX} listRef={listRef} refresh={refresh} setRefresh={setRefresh} navigation={navigation}/>}
                    contentContainerStyle={{paddingEnd : 240}}
                    getItemLayout={getTopItemLayout}
                    
                    onScroll={
                        Animated.event(
                            [{nativeEvent: {contentOffset: {x: topScrollX}},}],
                            {
                                listener: event => {
                                    /*
                                    const ar_te = 
                                    [
                                        100,
                                        140,
                                        130,
                                        135,
                                        129,
                                        118,
                                        118,
                                        118,
                                        118,
                                    ]*/
                                    const offsetX = Math.floor(event.nativeEvent.contentOffset.x / 118);
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
                                            setIsCurrent(offsetX == -1 ? 0 : offsetX);
                                        }, 1);
                                    }
                                    if(isTutorial && tutorialLevel == 0 && swipeTut){
                                        swipeTut = false;
                                        setTimeout(() => {
                                            listRef.current.scrollToIndex({index:0 , animated: true });
                                            ProceedTutorial(navigation);
                                        }, 1000);
                                    }
                                }
                            }
                        )
                    }
                />
            </View>
           
            <View row flex={6} >
                {(tutorialLevel == 2) && isTutorial ? <TutorialFinger style={{alignSelf: 'center', zIndex: 1}} tap/> : null}
                <View animated center flex={false} paddingY={[0,30]} size={[0.1]} opacity={leftOpacity}>

                <View
                center flex={false} rotate={90} rowVerse paddingY={[0,10]} left={25} > 
                    <Left setLeftActive={setLeftActive} navigation={navigation} />
                </View>
                
                </View>


                <View center middle >
                    
                    <List 
                        horizontal
                        initialNumToRender={2}
                        ref={middleListRef}
                        data={middleCuisine}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item, index }) =>  <Middle middleListRef={middleListRef} item={item} index={index} navigation={navigation} mocks_tab={isCurrent} mainRefresh={refresh} setMainRefresh={setRefresh}/>}
                        keyExtractor={(item, index)=>index.toString()}
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
                                        if(isTutorial && tutorialLevel == 5 && swipeTut){
                                            swipeTut = false;
                                            setTimeout(() => {
                                                ProceedTutorial(navigation);
                                                middleListRef.current.scrollToIndex({index : 0, animated: true });    
                                            }, TutDelayTime);
                                        }
                                    }
                                }
                            )
                        }
                    />
                    
                    { tutorialLevel == 5 && isTutorial ? <TutorialFinger swipe={true}/> : null}
                    { tutorialLevel == 6 && isTutorial ? <TutorialFinger style={{top: height * 0.2}} tap={true}/> : null}
                    { tutorialLevel == 7 && isTutorial ? <TutorialFinger style={{top: height * 0.05, left: width * 0.1}} tap={true}/> : null}
                    { tutorialLevel == 8 && isTutorial ? <TutorialFinger tap={true} style={{top : height * 0.5}}/> : null}
                </View>

            </View>


            <View end flex={1.2} paddingX={[0,0]}>
                <Bottom setBottomActive={setBottomActive}
                    data={causineTabs[isCurrent].bottomTabs}
                    setRefresh={setRefresh}
                    refresh={refresh}
                    navigation={navigation}
                />
                {(tutorialLevel == 3 || tutorialLevel == 4) && isTutorial ? <TutorialFinger swipe={tutorialLevel == 3} tap={tutorialLevel == 4} style={{alignSelf: 'center', top:10}} /> : null }
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