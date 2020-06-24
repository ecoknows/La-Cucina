import React,{useState, useRef} from 'react';
import { View, Text, Pic, Circle, List  } from '../components';
import { PanResponder,StyleSheet, Animated } from 'react-native';
import { theme, directions, } from '../constants';

function SheetText(props){
    const [ isDirection, setDirection ] = useState(true);
    const { item } = props 
    const { direction, recipe } = item;



    return(
        <View marginY={[50]} marginX={[theme.sizes.margin,theme.sizes.margin]} >
            <View flex={false} row center marginY={[0,theme.sizes.margin*2]}>
                <Text size={18} family='bold' 
                touchable
                tFlex={1}
                press={()=>setDirection(true)}
                accent={isDirection}
                secondary={!isDirection}
                center
                >Direction</Text>
                
                <Text 
                touchable
                tFlex={1}
                press={()=>setDirection(false)}
                size={18} family='bold'
                accent={!isDirection}
                secondary={isDirection}
                center
                >Recipe</Text>

            </View>

            <List 
                scrollEnabled={true}
                showsHorizontalScrollIndicator={false}
                data={isDirection ? direction : recipe}
                renderItem={({ item, index }) =>  
                
                <View row marginY={[0,20]} marginX={[0,30]}>
                    <Circle accent size={7} marginY={[5]}/>
                    <Text size={14} thirdary left={5} >{item.step}</Text>
                </View>

                }
                keyExtractor={item => item.id}
                
                contentContainerStyle={{paddingStart : 40, paddingBottom: 200}}
            />

        </View>
    );
}

function CuisineSelected({navigation, route}){
    navigation.setOptions({
        headerShown: false,
    });
    const pan = useRef(new Animated.ValueXY()).current;

    const { item } = route.params;
    const { name , color, time, capacity, burn} = item;
    

    const panResponderTwo = useRef( PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
          pan.setOffset({
            y: pan.y._value
          });
        },
        onPanResponderMove: Animated.event(
          [
            null,
            { dy: pan.y }
          ]
        ),
        onPanResponderRelease: () => {
          pan.flattenOffset();
        }
      })).current;

      const yAxis = pan.y.interpolate({
        inputRange: [-100,0],
        outputRange: [-100,0],
        extrapolate: 'clamp',
      });

    return(
        <View color={color}  >
        <Text touchable end size={30} top={20} right={20}  accent
            press={()=>navigation.goBack()}
         >x</Text>
            <View flex={1} paddingX={[theme.sizes.padding]} >
                <View flex={false}>
                    <Text h2 family='bold'> {name} </Text>
                </View>


                <View row>
                    <View paddingY={[30]} paddingX={[25]}>
                        <View flex={false} row paddingY={[20]}>
                            <Pic 
                                src={require('../assets/images/time.png')}
                                size={[25,25]}
                                accent
                            />
                            <Text end family='semi-bold' size={13} thirdary left={7}>{time}</Text>
                        </View>
                        <View flex={false} row paddingY={[20]}>
                            <Pic 
                                src={require('../assets/images/people.png')}
                                size={[25,25]}
                                accent
                            />
                            <Text end family='semi-bold' size={13} thirdary left={7}>{capacity}</Text>
                        </View>
                        <View flex={false} row paddingY={[20]}>
                            <Pic 
                                src={require('../assets/images/fire.png')}
                                size={[25,25]}
                                accent
                            />
                          <Text end family='semi-bold' size={13} thirdary left={7}>{burn}</Text>
                        </View>


                    </View>

                    <View >
                        <Pic src={require('../assets/images/test.png')}
                            resizeMode='contain'
                            size={[300,300]}
                         />

                    </View>

                </View>

            </View>

            
            <View  animated white flex={false} absolute 
            
                    style={[styles.bottomSheet, 
                    {
                        transform: [
                            {
                                translateY: yAxis
                            }
                        ]
                    }
                    ]}
                 >
                    <View 
                    middle
                    flex={false}
                    absolute
                    width='100%'
                    paddingTop={25}
                    color='transparent'
                    height={80}
                     {...panResponderTwo.panHandlers}>
                        <View 
                            color={color}
                            style={styles.indicator}/>
                    </View>
                    <SheetText item={item} />
            </View>

            
        </View>
    );
}

export default CuisineSelected;

const styles = StyleSheet.create({
    bottomSheet : {
        width: '100%',
        height: 500,
        bottom: -150,
        borderRadius: 35,
    },
    indicator: {
        flex: 0,
        height: 8,
        width: 90,
        borderRadius: 20,
    }
});