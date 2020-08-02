import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, ScrollView,TouchableOpacity, Animated, Easing } from 'react-native';
import { View, Pic,List,Text } from '../components';
import { FetchHistory } from '../database/database';
import { tabs } from '../constants';
const ODD = -1, EVEN = -2, FIRST = -3, LAST_EVEN = -4, LAST_ODD = -5;
let late_index = 0;
const data_change = { value : true};
const isAnim = { value : true};
       
function ListView(props){
    const {item, index, size, latestIndex, setLatestIndex, navigation} = props;
    const {mocks_tabs, mocks_index, capacity, time_finished, date} = item;
    const index_plus = index+1;
    
    let cuisine = tabs.cuisine.uppedTabs[mocks_tabs].mocks[mocks_index];    
    const item_date = new Date(date);
    const monthsText = ['Jan','Feb','March','April','May','Jun','July','Aug','Sept','Oct','Nov','Dec'];
    const display_date = monthsText[item_date.getMonth()] + ' / ' + item_date.getDate() + ' / ' + item_date.getFullYear();
    let hour = item_date.getHours();
    let minutes = item_date.getMinutes();
    minutes = minutes < 10 ?  '0' + minutes : minutes;
    const std = (hour >= 12 )? 'PM': 'AM';
    hour = (hour >= 13 ) ? (hour - 12) : hour;
    let time = hour + ':' + item_date.getMinutes() +' '+ std;

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
    if(late_index == index && isAnim.value)
        animation_out();

    if(latestIndex == index && isAnim.value)
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
                                >{time_finished}</Text>
                                    
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
                                >{capacity} persons</Text>
                                

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
                                >{cuisine.burn}</Text>

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
                            >{time_finished}</Text>

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
                        >{capacity} persons</Text>

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
                        >{cuisine.burn}</Text>

                    </View>
                        
                    <View zIndex={2} absolute flex={false} left={-200} size={[200,25]} white/>
                    <View zIndex={1} absolute flex={false} size={[40,25]} white/>
                </View>
                    
            </View>
        )
    }
    

    const Even_Item = () => {
        return(
            <View flex={false} white size={['100%', 240]} center>
                {(latestIndex == index || late_index == index) ? <View animated flex={false} middle style={{position:'absolute', top: -18, right: 15, width: 170, height: 30, opacity: title_anim}}>
                        <Text 

                            family='bold'
                            style={{position:'absolute', bottom: 0,textAlign:'center'}}
                            size={24}
                            accent
                            >{cuisine.name}</Text>
                </View> : null }
                
                <View flex={false} center middle right={55} zIndex={3}>

                    <View flex={false} style={[styles.diagonal_right, {transform:[{rotate: '-45deg'}]}]}/>
                    
                    <View flex={false} style={[styles.diagonal_left,{transform:[{rotate: '45deg'}], opacity: item_state == LAST_EVEN ? 0: 1}]}/>
                    
                </View>
                
                <View row style={{position:'absolute', right: '5%'}}>
                    
                {(latestIndex == index || late_index == index) ? <EvenInfo/> : null }
                

                    <TouchableOpacity activeOpacity={1} style={{zIndex: 5}} onPress={()=>{
                        if(latestIndex != index){
                            setLatestIndex(index); 
                            late_index = latestIndex;
                        }else{
                            cuisine.mocks_tabs = mocks_tabs;
                            cuisine.index = mocks_index;
                            navigation.navigate('CuisineSelected', {item: cuisine, data_change})
                        }
                    }}>
                        <Pic

                                size={[170,170]}
                                src={item.image} />

                    </TouchableOpacity>
                </View>
                
                <View flex={false} middle style={{position:'absolute',bottom:0, right: 20, width: 140,}} middle>
                        <Text
                            accent
                            size={13}
                            >{display_date}</Text>
                         <Text
                            accent
                            family='bold'
                            size={12}
                            >{time}</Text>
                </View>

            
            </View>
        )
    }

    const Odd_Item = () => {
        return(

                            
            <View flex={false} size={['100%', 240]} center>
                    {(latestIndex == index || late_index == index) ? <View animated flex={false} middle style={{position:'absolute', top: -20, left: 0, width: 170, height: 30,opacity: title_anim}}>
                        <Text 
                            family='bold'
                            style={{position:'absolute', bottom: 0,textAlign:'center'}}
                            size={24}
                            accent
                            >{cuisine.name}</Text>
                    </View> : null}
                    
                
                <View flex={false} center middle left={40} transform={[{rotate: '180deg'}]} zIndex={3}>

                    <View flex={false} style={[styles.diagonal_right, {transform:[{rotate: '-45deg'}],opacity: item_state == LAST_ODD ? 0: 1}]} />
                            
                    <View flex={false} style={[styles.diagonal_left,{transform:[{rotate: '45deg'}],opacity: (item_state == FIRST || (item_state == LAST_ODD && index == 0))? 0: 1}]} />
                        
                        
                </View>

                <View flex={false}  style={{position:'absolute'}} row>
                    

                    <TouchableOpacity style={{zIndex: 5, paddingLeft: 10}} activeOpacity={1} onPress={()=>{
                        if(latestIndex != index){
                            setLatestIndex(index); 
                            late_index = latestIndex;
                        }else{
                            cuisine.mocks_tabs = mocks_tabs;
                            cuisine.index = mocks_index;
                            navigation.navigate('CuisineSelected', {item: cuisine,data_change})
                        }
                        }}>

                        <Pic
                                resizeMode='contain'
                                size={[170,170]}
                                src={item.image} />

                    </TouchableOpacity>
                    

                    {(latestIndex == index || late_index == index) ? <View flex={false} paddingTop='2%' row>

                        <OddInfo/>
                    </View> : null }

                </View>

                    <View flex={false} style={{position:'absolute',bottom:0, left: 0, width: '43%',}} middle>
                            
                            <Text
                                accent
                                size={13}
                                >{display_date}</Text>
                                
                            <Text
                                accent
                                family='bold'
                                size={12}
                                >{time}</Text>
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

function History({navigation}){
    const [latestIndex, setLatestIndex] = useState(0);
    const [data , setData] = useState([]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            FetchHistory(setData,isAnim);
        });
          return unsubscribe;
      }, [navigation]);
      
    useEffect(() => {
        isAnim.value = true;
      }, [data]);
    

    return(
       <View white>
            <List 
                    marginTop={50}
                    data={data}
                    renderItem={({item,index})=> <ListView item={item} index={index} size={data.length}  latestIndex={latestIndex} setLatestIndex={setLatestIndex} navigation={navigation}/> }
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
        height: 160,
        left:100,
        bottom: 12.53,
        backgroundColor: '#FFBE93'
    },
    diagonal_right : {
        width: 3,
        left:100,
        height: 160,
        bottom: -12.53,
        backgroundColor: '#FFBE93'
    },
})