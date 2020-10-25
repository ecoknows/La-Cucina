import React, {useRef} from 'react';
import {Animated} from 'react-native';
import { View, Circle, Pic } from '../components';

// TO BE EXPORTED
const ProceedTutorial = (
    navigation, 
    navigate,
    text,
    )=>{
    navigation.navigate('InfoModal',{info: 
        {
        text,
        }, 
        button: [
            {
                title: 'Ok',
                navigate,
                purpose: TUTORIAL,
            },
            ],  
        exit: false,
    });
}

const StartTutorial =(navigation,navigate,text)=>{
    navigation.navigate('InfoModal',{info: 
        {
        text
        }, 
        button: [
            {
                title: 'Ok',
                navigate,
                purpose: TUTORIAL,
            },
            ],  
        exit: true,
        });
}
function TutorialFinger(props){
    const animated = useRef(new Animated.Value(1.1)).current;
    const swipe_animated = useRef(new Animated.Value(0)).current;
    let circle_trans = null;
    const { swipe, tap, vertical,alternate, upward  } = props;
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
    if(swipe && alternate && !vertical){

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
                        toValue: 100,
                        duration: 3000,
                    }),
                    Animated.timing(swipe_animated,{
                        toValue: 0,
                        duration: 3000,
                    }),
                ])
            ).start();
        }
        animatedStart();
    }
    if(swipe && vertical && alternate){

        picstyle = {transform: [{ translateY: swipe_animated},{scale: animated}]};
        circle_trans = {transform: [{translateY: swipe_animated}]}
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
                    Animated.timing(swipe_animated,{
                        toValue: 100,
                        duration: 3000,
                    }),
                    
                ])
            ).start();
        }
        animatedStart();
    }
    
    if(swipe  && !vertical && !alternate){
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

    if(swipe && !upward){

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
                        toValue: 100,
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
    
    if(swipe && upward){

        picstyle = {transform: [{ translateY: swipe_animated},{scale: animated}]};
        circle_trans = {transform: [{translateY: swipe_animated}]}
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
const TutorialModal =()=>{
    navigation.navigate('InfoModal',{info: 
        {
        text:'You have current tutorial at ' + tutorial.current + '\ntab I will navigate you back'
        }, 
        button: [
            {
                title: 'Ok',
                navigate: tutorial.current
            },
            ],  
        exit: false,
        });
}

const tutorial_info = {
    cuisine: [
        'You can swipe the upper tabs\nto see more meals of ^_^',
        'Tap the meal that you want',
        'You can tap the left tab,\non what kind of food you want ^_^',
        'You can swipe the bottom tabs\nto see what kind of cuisine \nyou want ^_^',
        'Tap the kind of cuisine you want ^_^',
        'The middle part is where the food are,\nswipe it to see more ^_^',
        'If you click the photo \nof the meal it will zoom',
        'At the left top you will see a heart icon,\nif you tap the food will be\nlist on your favorites ^_^',
        'Lastly if you tap the food it\nwill navigate you to the recipe.',
    ],
    cuisine_selected : [
        'You can increase the people who can eat it. ^_^',
        'You can decrease the people who can eat it. ^_^',
        'Swipe upward the sheet\nwhere the ingridients and \ndirection listed ^.^',
        'Swipe sideward the nutrition\nso that you can see \nthe nutrition xD',
        'Tap the nutrition to automatically open it ^,^',
        'You can also zoom the image\nof cuisine by tapping it ^,^',
        'On the ingridients you can tap \nthe check boxes =.=',
        'Tap on direction so that you can see \nthe proceedure. *^.^',
        'If you want to start the proceedure tap the start ^.^',
        'If you\'re done doing the proceedure you can tap done ^_^',
        'You can go back to ingridients \nby tapping it. ^_^',
        'Lastly if your done and changes \nare made you can save it or not \nby tapping X. ^_^',
    ],
}

// Variables :P
const TUTORIAL = 122019;

const tutorial = {
    current: "Ingridients", //todo:  null
    curr_num : 1,
    favorite: false,
    history: false,
    ingridients: true,
}

const variables = {
    active : 0,
    tutorial_proceed : false,
}

export{
    tutorial,
    variables,
    tutorial_info,
    TUTORIAL,
    ProceedTutorial,
    StartTutorial,
    TutorialFinger,
    TutorialModal,
}
