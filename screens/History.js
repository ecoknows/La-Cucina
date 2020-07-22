import React, { useState, useRef } from 'react';
import { StyleSheet, ScrollView,TouchableOpacity, Animated } from 'react-native';
import { View, Pic,List,Text } from '../components';
const ODD = -1, EVEN = -2, FIRST = -3, LAST_EVEN = -4, LAST_ODD = -5;
const data_set = [
    { random: 'red'},
    { random: 'yellow'},
    { random: 'yellow'},
    { random: 'yellow'},
    { random: 'yellow'},
    { random: 'yellow'},
    ];



function History(){
    const [latestIndex, setLatestIndex] = useState(0);

    
    function ListView(props){
        const {item, index, size} = props;
        const index_plus = index+1;    
        let isWidth = 0;
        const scale_line = useRef(new Animated.Value(0)).current;
        const text_anim = useRef(new Animated.Value(0)).current;
        const image_anim = useRef(new Animated.Value(-30)).current;

        let item_state = (index_plus % 2) == 0 ? EVEN : ODD;
        item_state = (index_plus == 1) ? FIRST : item_state;
        if(index_plus == size){
            if((index_plus % 2) == 0 ){
                item_state = LAST_EVEN;
            }else{
                
                item_state = LAST_ODD;
            }
        }
        const animation_in =()=>{
            Animated.sequence([
                
            Animated.timing(scale_line,{
                toValue: 1
                
            }),
            
            Animated.timing(image_anim,{
                toValue: 10
            }),
            
            Animated.timing(text_anim,{
                toValue: 20
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
                toValue: isWidth
            }),
            
            Animated.timing(scale_line,{
                toValue: 0
                
            }),
    
            ]).start();
        }    

        const Even_Item = () => {
            return(
                <View flex={false} white size={['100%', 210]} center>
                    {latestIndex == index? <View flex={false} middle style={{position:'absolute', top: -18, right: 15, width: 170, height: 30,}}>
                            <Text 
                                family='bold'
                                style={{position:'absolute', bottom: 0,textAlign:'center'}}
                                size={24}
                                accent
                                >Daing Silog </Text>
                    </View>: null}
                        
                    
                    <View flex={false} center middle right={55}>

                        <View flex={false} style={[styles.diagonal_right, {transform:[{rotate: '-45deg'}]}]}/>
                        
                        <View flex={false} style={[styles.diagonal_left,{transform:[{rotate: '45deg'}], opacity: item_state == LAST_EVEN ? 0: 1}]}/>
                        
                    </View>
                    
                    <View row style={{position:'absolute', right: '5%'}}>
                    { latestIndex == index ?<View flex={false} center >
                           <View flex={false} row end>
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
                                <Pic
                                        size={[25,25]}
                                        accent
                                        src={require('../assets/images/time.png')} />
                            
                            </View>
                           <View flex={false} row end marginTop={20} marginRight={10}>
                                    <Text
                                            accent
                                            family='semi-bold'
                                            size={13}
                                            left={4}
                                            top={4}
                                            right={3}
                                            >2 persons</Text>
                                            
                                <Pic
                                        size={[25,25]}
                                        accent
                                        src={require('../assets/images/people.png')} />
                            
                           </View>
                           <View flex={false} row end marginTop={25}>
                                    <Text
                                            accent
                                            family='semi-bold'
                                            size={13}
                                            left={4}
                                            top={4}
                                            right={6}
                                            >32 calories</Text>
                                <Pic
                                        size={[20,20]}
                                        accent
                                        src={require('../assets/images/fire.png')} />
                            
                            </View>
                    
                    </View> : null }

                    <TouchableOpacity activeOpacity={1}  onPress={()=>setLatestIndex(index)}>
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

        const OddInfo = props =>{
            animation_in();
            return(
                <View flex={false}>
                    <View flex={false} row>
                        <View zIndex={3} animated flex={false} accent size={[3,25]} 
                            style={{
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
                        <View zIndex={1} absolute flex={false} size={[40,25]} white/>

                        <View animated flex={false} row
                        style={{
                            transform:[{translateX : text_anim }],
                            }}
                            
                        onLayout={(event) => {
                            var {x, y, width, height} = event.nativeEvent.layout;
                            isWidth = -(width+5);
                            text_anim.setValue(-(width+5))
                        }}
                        >
                            
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
                        <Pic
                        size={[25,25]}
                        accent
                        src={require('../assets/images/people.png')} />
                        <Text
                            accent
                            family='semi-bold'
                            size={13}
                            left={4}
                            top={4}
                            end
                            >2 persons</Text>
                    </View>
                    <View flex={false} row marginTop={30} marginLeft={7} >
                        <Pic
                        size={[20,20]}
                        accent
                        src={require('../assets/images/fire.png')} />
                        <Text
                            accent
                            family='semi-bold'
                            size={13}
                            left={4}
                            top={4}
                            end
                            >32 calories</Text>
                    </View>
                      
                </View>
            )
        }


        const Odd_Item = () => {
            return(

                                
                <View flex={false} white size={['100%', 210]} center>
                        {latestIndex == index ?<View flex={false} middle style={{position:'absolute', top: -20, left: 0, width: 170, height: 30,}}>
                            <Text 
                                family='bold'
                                style={{position:'absolute', bottom: 0,textAlign:'center'}}
                                size={24}
                                accent
                                >Daing Silog</Text>
                        </View>: null}
                        
                    
                    <View flex={false} center middle left={40} transform={[{rotate: '180deg'}]} zIndex={5}>

                        <View flex={false} style={[styles.diagonal_right, {transform:[{rotate: '-45deg'}],opacity: item_state == LAST_ODD ? 0: 1}]} />
                                
                        <View flex={false} style={[styles.diagonal_left,{transform:[{rotate: '45deg'}],opacity: (item_state == FIRST || (item_state == LAST_ODD && index == 0))? 0: 1}]} />
                            
                            
                    </View>

                    <View flex={false}  style={{position:'absolute'}} row>
                        

                        <TouchableOpacity style={{zIndex: 5}} activeOpacity={1} onPress={()=>setLatestIndex(index)}>

                            <Pic
                                    size={[170,170]}
                                    src={require('../assets/images/test.png')} />

                        </TouchableOpacity>
                        

                        { latestIndex == index ? 
                        <View flex={false} paddingTop='2%' row>

                            <OddInfo/>
                        </View> : null}
                        
                        <View size={[170,150]} zIndex={4} absolute flex={false} white/>
                    

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

    return(
       <View white>
            <List 
                    marginTop={50}
                    data={data_set}
                    renderItem={({item,index})=> <ListView item={item} index={index} size={data_set.length} /> }
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