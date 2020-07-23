import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, ScrollView,TouchableOpacity, Animated } from 'react-native';
import { View, Pic,List,Text } from '../components';
import { Easing } from 'react-native-reanimated';
const ODD = -1, EVEN = -2, FIRST = -3, LAST_EVEN = -4, LAST_ODD = -5;
const data_set = [
    { random: 'red'},
    { random: 'yellow'},
    { random: 'yellow'},
    { random: 'yellow'},
    { random: 'yellow'},
    { random: 'yellow'},
    ];

let late_index = 0;
    
    
function ListView(props){
    const {item, index, size, latestIndex, setLatestIndex} = props;
    const index_plus = index+1;    
    let item_state = (index_plus % 2) == 0 ? EVEN : ODD;
    item_state = (index_plus == 1) ? FIRST : item_state;
    if(index_plus == size){
        if((index_plus % 2) == 0 ){
            item_state = LAST_EVEN;
        }else{
            
            item_state = LAST_ODD;
        }
    }
    const isOdd = ((index_plus % 2) == 1);
    
    const scale_line = useRef(new Animated.Value(0)).current;
    const text_anim = useRef(new Animated.Value(isOdd ?-200 : 200)).current;
    const image_anim = useRef(new Animated.Value(isOdd ? -30 : 30)).current;
    const title_anim = useRef(new Animated.Value(0)).current;


    const animation_in =()=>{
        
        Animated.timing(title_anim,{
            toValue: 1,
            duration: 500,
            easing: Easing.linear,
        }).start();
        Animated.sequence([
        Animated.timing(scale_line,{
            toValue: 1,
            easing: Easing.linear,
        }),
        
        Animated.timing(image_anim,{
            toValue: isOdd ? 10 : -10
        }),
        
        Animated.timing(text_anim,{
            toValue: isOdd ? 20 : -20
        }),
        
        Animated.timing(scale_line,{
            toValue: 0
            
        }),
        

        ]).start();
    }

    const animation_out =()=>{
        Animated.sequence([
            
        Animated.timing(scale_line,{
            toValue: 1
            
        }),
        
        Animated.timing(text_anim,{
            toValue: isOdd ? -200 : 200
        }),
        Animated.timing(image_anim,{
            toValue: isOdd ? -30 : 30
        }),
        
        
        Animated.timing(scale_line,{
            toValue: 0
            
        }),
        
        Animated.timing(title_anim,{
            toValue: 0,
            duration: 500,
            easing: Easing.linear,
        }),

        ]).start();
    }    
    if(late_index == index)
        animation_out();

    if(latestIndex == index)
        animation_in(); 

    const EvenInfo =()=>{
        return(
            <View flex={false} center >
                <View flex={false} row end>

                        <View animated flex={false} row
                            style={{
                                transform:[{translateX : text_anim }],
                                }} >
                            <Text
                                accent
                                family='semi-bold'
                                size={13}
                                left={4}
                                top={4}
                                >31 min</Text>
                                    
                            <Text
                                color='#FDAC76'
                                family='bold'
                                size={12}
                                left={4}
                                top={5}
                                right={3}
                                >finished</Text>

                        </View>


                    <View zIndex={2} absolute flex={false} right={-200} size={[200,25]} white/>
                    <View zIndex={1} absolute flex={false} right={0} size={[40,25]} white/>

                        
                    
                        <Pic
                            size={[25,25]}
                            accent
                            animated
                            style={{transform:[{translateX: image_anim}], zIndex: 1}}
                            src={require('../assets/images/time.png')} />

                            
                    <View zIndex={5} animated flex={false} accent size={[3,25]} 
                        style={{
                            opacity:scale_line.interpolate({
                                inputRange: [0,1],
                                outputRange: [0,10],
                                extrapolate: 'clamp',
                            }),
                            transform: [{
                                scaleY: scale_line
                            }]
                        }}
                    />
                    
                            
                        
                
                </View>
                <View flex={false} row end marginTop={20} marginRight={10}>
                    
                        <View animated flex={false} row
                            style={{
                                transform:[{translateX : text_anim }],
                                }} >
                            <Text
                                accent
                                family='semi-bold'
                                size={13}
                                left={4}
                                top={4}
                                right={3}
                                >2 persons</Text>
                                

                        </View>
                        
                    <View zIndex={2} absolute flex={false} right={-200} size={[200,25]} white/>
                    <View zIndex={1} absolute flex={false} right={0} size={[40,25]} white/>

                        
                    <Pic
                            size={[25,25]}
                            accent
                            animated
                            style={{transform:[{translateX: image_anim}], zIndex: 1}}
                            src={require('../assets/images/people.png')} />
                    
                            
                    <View zIndex={5} animated flex={false} accent size={[3,25]} 
                        style={{
                            opacity:scale_line.interpolate({
                                inputRange: [0,1],
                                outputRange: [0,10],
                                extrapolate: 'clamp',
                            }),
                            transform: [{
                                scaleY: scale_line
                            }]
                        }}
                    />
                    
                
                </View>
                <View flex={false} row end marginTop={25}>
                    
                        <View animated flex={false} row
                            style={{
                                transform:[{translateX : text_anim }],
                                }} >

                            <Text
                                accent
                                family='semi-bold'
                                size={13}
                                left={4}
                                top={4}
                                right={6}
                                >32 calories</Text>

                        </View>

                        
                        <View zIndex={2} absolute flex={false} right={-200} size={[200,25]} white/>
                        <View zIndex={1} absolute flex={false} right={0} size={[40,25]} white/>


                        <Pic
                            size={[20,20]}
                            accent
                            animated
                            style={{transform:[{translateX: image_anim}], zIndex: 1}}
                            src={require('../assets/images/fire.png')} />

                            
                        <View zIndex={5} animated flex={false} accent size={[3,25]} 
                            style={{
                                opacity:scale_line.interpolate({
                                    inputRange: [0,1],
                                    outputRange: [0,10],
                                    extrapolate: 'clamp',
                                }),
                                transform: [{
                                    scaleY: scale_line
                                }]
                            }}
                        />
                    
                
                </View>
                
            </View>
        )
    }
    
    const OddInfo = props =>{
        return(
            <View flex={false} marginLeft={-5}>
                <View flex={false} row>
                    <View zIndex={5} animated flex={false} accent size={[3,25]} 
                        style={{
                            opacity:scale_line.interpolate({
                                inputRange: [0,1],
                                outputRange: [0,10],
                                extrapolate: 'clamp',
                            }),
                            transform: [{
                                scaleY: scale_line
                            }]
                        }}
                    />
                    
                    <Pic
                        animated
                        size={[25,25]}
                        style={{transform:[{translateX: image_anim}], zIndex: 2}}
                        accent 
                        src={require('../assets/images/time.png')} />

                    <View zIndex={2} absolute flex={false} left={-200} size={[200,25]} white/>
                    <View zIndex={1} absolute flex={false} size={[40,25]} white/>

                    <View animated flex={false} row
                    style={{
                        transform:[{translateX : text_anim }],
                        }} >
                        
                        <Text
                            accent
                            family='semi-bold'
                            size={13}
                            bottom={2}
                            end
                            >31 min</Text>

                        <Text
                            color='#FDAC76'
                            family='bold'
                            size={12}
                            left={4}
                            bottom={2}
                            end
                            >finished</Text>

                    </View>
                </View>
                
                <View flex={false} row  marginTop={20} marginLeft={15}>
                    
                <View zIndex={5} animated flex={false} accent size={[3,25]} 
                        style={{
                            opacity: scale_line.interpolate({
                                inputRange: [0,1],
                                outputRange: [0,10],
                                extrapolate: 'clamp',
                            }),
                            transform: [{
                                scaleY: scale_line
                            }]
                        }}
                    />
                    <Pic
                    animated
                    size={[25,25]}
                    accent
                    style={{transform:[{translateX: image_anim}], zIndex: 2}}
                    src={require('../assets/images/people.png')} />
                    <View animated flex={false} row
                    style={{
                        transform:[{translateX : text_anim }],
                        }}
                        
                    >
                    <Text
                        accent
                        family='semi-bold'
                        size={13}
                        left={4}
                        top={4}
                        end
                        >2 persons</Text>

                    </View>
                    <View zIndex={2} absolute flex={false} left={-200} size={[200,25]} white/>
                    <View zIndex={1} absolute flex={false} size={[40,25]} white/>
                </View>

                <View flex={false} row marginTop={30} marginLeft={7} >
                    
                <View zIndex={5} animated flex={false} accent size={[3,25]} 
                        style={{
                            opacity:scale_line.interpolate({
                                inputRange: [0,1],
                                outputRange: [0,10],
                                extrapolate: 'clamp',
                            }),
                            transform: [{
                                scaleY: scale_line
                            }]
                        }}
                    />
                    <Pic
                    animated
                    size={[20,20]}
                    accent
                    style={{transform:[{translateX: image_anim}], zIndex: 2}}
                    src={require('../assets/images/fire.png')} />
                    <View animated flex={false} row
                    style={{
                        transform:[{translateX : text_anim }],
                        }}
                        
                    >
                    <Text
                        accent
                        family='semi-bold'
                        size={13}
                        left={4}
                        top={4}
                        end
                        >32 calories</Text>

                    </View>
                        
                    <View zIndex={2} absolute flex={false} left={-200} size={[200,25]} white/>
                    <View zIndex={1} absolute flex={false} size={[40,25]} white/>
                </View>
                    
            </View>
        )
    }
    

    const Even_Item = () => {
        return(
            <View flex={false} white size={['100%', 210]} center>
                 {(latestIndex == index || late_index == index) ? <View animated flex={false} middle style={{position:'absolute', top: -18, right: 15, width: 170, height: 30, opacity: title_anim}}>
                        <Text 

                            family='bold'
                            style={{position:'absolute', bottom: 0,textAlign:'center'}}
                            size={24}
                            accent
                            >Daing Silog </Text>
                </View> : null }
                
                <View flex={false} center middle right={55}>

                    <View flex={false} style={[styles.diagonal_right, {transform:[{rotate: '-45deg'}]}]}/>
                    
                    <View flex={false} style={[styles.diagonal_left,{transform:[{rotate: '45deg'}], opacity: item_state == LAST_EVEN ? 0: 1}]}/>
                    
                </View>
                
                <View row style={{position:'absolute', right: '5%'}}>
                    
                {(latestIndex == index || late_index == index) ? <EvenInfo/> : null }
                

                    <TouchableOpacity activeOpacity={1} style={{zIndex: 5}} onPress={()=>{setLatestIndex(index);late_index = latestIndex;}}>
                        <Pic
                                size={[170,170]}
                                src={require('../assets/images/test.png')} />

                    </TouchableOpacity>
                </View>
                
                <View flex={false} middle style={{position:'absolute',bottom:0, right: 20, width: 140,}} middle>
                        <Text
                            accent
                            size={13}
                            >2020, December 20</Text>
                </View>

            
            </View>
        )
    }

    const Odd_Item = () => {
        return(

                            
            <View flex={false} white size={['100%', 210]} center>
                    {(latestIndex == index || late_index == index) ? <View animated flex={false} middle style={{position:'absolute', top: -20, left: 0, width: 170, height: 30,opacity: title_anim}}>
                        <Text 
                            family='bold'
                            style={{position:'absolute', bottom: 0,textAlign:'center'}}
                            size={24}
                            accent
                            >Daing Silog</Text>
                    </View> : null}
                    
                
                <View flex={false} center middle left={40} transform={[{rotate: '180deg'}]} zIndex={3}>

                    <View flex={false} style={[styles.diagonal_right, {transform:[{rotate: '-45deg'}],opacity: item_state == LAST_ODD ? 0: 1}]} />
                            
                    <View flex={false} style={[styles.diagonal_left,{transform:[{rotate: '45deg'}],opacity: (item_state == FIRST || (item_state == LAST_ODD && index == 0))? 0: 1}]} />
                        
                        
                </View>

                <View flex={false}  style={{position:'absolute'}} row>
                    

                    <TouchableOpacity style={{zIndex: 5}} activeOpacity={1} onPress={()=>{setLatestIndex(index); late_index = latestIndex;}}>

                        <Pic
                                size={[170,170]}
                                src={require('../assets/images/test.png')} />

                    </TouchableOpacity>
                    

                    {(latestIndex == index || late_index == index) ? <View flex={false} paddingTop='2%' row>

                        <OddInfo/>
                    </View> : null }

                </View>

                    <View flex={false} style={{position:'absolute',bottom:0, left: 25, width: 140,}} middle>
                            
                            <Text
                                accent
                                size={13}
                                >2020, December 20</Text>
                    </View>
            </View>

        )
    }

    switch(item_state){
        case FIRST: 
                return Odd_Item();
        case ODD: 
                return Odd_Item();
        case EVEN: 
                return Even_Item();
        case LAST_EVEN: 
                return Even_Item();
        case LAST_ODD: 
                return Odd_Item();

    }

    


}

function History(){
    const [latestIndex, setLatestIndex] = useState(0);

    return(
       <View white>
            <List 
                    marginTop={50}
                    data={data_set}
                    renderItem={({item,index})=> <ListView item={item} index={index} size={data_set.length}  latestIndex={latestIndex} setLatestIndex={setLatestIndex} /> }
                    keyExtractor={(item,index)=> index.toString()}
                    
                    contentContainerStyle={{paddingTop: 100,paddingBottom: 100}}
            />
       </View>
    )
}

export default History;


const styles = StyleSheet.create({
    diagonal_left : {
        width: 3,
        height: 150,
        left:100,
        bottom: 22.53,
        backgroundColor: '#FFBE93'
    },
    diagonal_right : {
        width: 3,
        left:100,
        height: 150,
        bottom: -22.53,
        backgroundColor: '#FFBE93'
    },
})