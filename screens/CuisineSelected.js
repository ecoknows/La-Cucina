import React,{useState, useRef, useEffect} from 'react';
import { View, Text, Pic, Circle, List  } from '../components';
import { PanResponder,StyleSheet, Animated } from 'react-native';
import { theme, directions, } from '../constants';
import { CheckBox } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';

const DONE = 0;
const START = 1;
let current_step;
let nutrition_latestoffset = 0;
let sheet_latestoffset = 0;
function SheetText(props){
    const [ isDirection, setDirection ] = useState(false);
    const [isIndicator, setIsIndicator] = useState(true);
    const [isCurrentStepState, setIsCurrentStepState] = useState(START);
    const { item,capacity, people } = props 
    const { direction, ingridients } = item;
    
    useEffect(()=> {
        
    current_step = 0;

    },[]);


    const IndicatorClick =()=>{
        setIsIndicator(isIndicator ? false : true);
        setIsCurrentStepState( isCurrentStepState ? DONE : START);
        if(isCurrentStepState == DONE)
            current_step++;
    }


    const SheetListView = props => {

        const {item, index} = props;
        const [checked, setChecked] = useState(item.checked);
        
        const CheckBoxClick =()=>{
            setChecked(checked ? false : true);
            item.checked = checked ? false : true;
        }

        let itemColor = null;
        let isCircle = true;
        if ( current_step == index && isCurrentStepState == DONE && isDirection) {
            itemColor = theme.colors.accent;
        } else if ( current_step > index  && isDirection){
            itemColor = '#18A623';
            isCircle = false;
        }else{
            itemColor = theme.colors.thirdary;
        }
        const isActive = current_step == index ? true : false;
        const Indicator = (isActive && isDirection) ? 
        <View flex={false} size={[33]}>
            <Text size={12} color='#18A623' family='bold' touchable press={IndicatorClick}>
                {isIndicator ? 'Start' : 'Done'}
            </Text>
        </View> : null;
        let SideTextIndicator = null;
        let ValueText = null;
        let textLeft = 5;
        if(isDirection){
            if(!isCircle){
                SideTextIndicator = <Pic src={require('../assets/images/check.png')} resizeMode='cover' size={[20,20]}/>
            }else {
                SideTextIndicator =   <Circle color={itemColor == theme.colors.thirdary ? theme.colors.accent : itemColor } size={7} marginY={[5]}/>;
            }
        }else{
            SideTextIndicator =  <CheckBox checked={checked} checkedColor='green' uncheckedColor='green' size={18} containerStyle={{height: 10 ,width:30, paddingEnd: 10, marginLeft: -25, marginTop: 1,}} onPress={CheckBoxClick}/>
            textLeft = -5;
            itemColor = checked ? '#18A623' : theme.colors.thirdary;
            let value = Math.round( ((item.value/ people)*(capacity-people) + item.value) * 100) / 100;
            value =( ( (value % 1) == 0.5  ) && value - 0.5 != 0)? ( (value - 0.5).toString() +' 1/2' ): value;
            value =( ( (value % 1) == 0.75  ) && value - 0.75 != 0)? ( (value - 0.75).toString() +' 3/4' ): value;
            value = value == 0.75 ? '3/4' : value;
            value = value == 0.5 ? '1/2' : value;
            ValueText =  <Text size={14} color={itemColor} left={textLeft} family='semi-bold'>{value} </Text>
            textLeft = 0;

            //console.log(capacity, ' ', people);
        }

        return(
            <View row>
            {Indicator}
            <View row marginY={[0,20]} marginX={[ (isActive && isDirection) ? 15 : 50 ,30]} >
                {SideTextIndicator}
                {ValueText}
                <Text size={14} color={itemColor} left={textLeft} family='semi-bold'>{item.step}</Text>
            </View>

            </View>
        );
    }

    return(
        <View marginY={[50]} marginX={[theme.sizes.margin * 2,theme.sizes.margin * 2]} >
            <View flex={false} row center marginY={[0,theme.sizes.margin*2]}>
                
               <Text 
                touchable
                tFlex={1}
                press={()=>setDirection(false)}
                size={18} family='bold'
                accent={!isDirection}
                secondary={isDirection}
                center
                >Ingridients</Text>

                <Text size={18} family='bold' 
                touchable
                tFlex={1}
                press={()=>setDirection(true)}
                accent={isDirection}
                secondary={!isDirection}
                center
                >Direction</Text>
                
            </View>

            <List 
                extraData={isCurrentStepState}
                scrollEnabled={true}
                showsHorizontalScrollIndicator={false}
                data={isDirection ? direction : ingridients}
                renderItem={({ item, index }) =>  <SheetListView item={item} index={index}/>
                }
                keyExtractor={(item,index)=>index.toString()}
                
                contentContainerStyle={{paddingBottom: 200}}
            />

        </View>
    );
}

function PeopleView(props){
    const {item, mainCapacity} = props;
    const [capacity, setCapacity] = useState(item.capacity);
    
    return(
        <View flex={false} row paddingY={[20]}>
            <TouchableOpacity onPress={()=>{
                    setTimeout(() => {
                        mainCapacity(capacity+1);
                    }, 1);
                    setCapacity(capacity+1);
            }}>
                <Pic 
                    src={require('../assets/images/upgrade.png')}
                    size={[25,25]}
                    accent
                />
            </TouchableOpacity>
            <Pic 
                src={require('../assets/images/people.png')}
                size={[25,25]}
                accent
            />
            <Text end family='semi-bold' size={13} thirdary left={7}>{capacity}</Text>
            <Text end family='semi-bold' size={13} thirdary> people</Text>
            <TouchableOpacity onPress={()=>{
                    setTimeout(() => {
                        mainCapacity(capacity-1);
                    }, 1);
                    setCapacity(capacity-1);
            }}>
                <Pic 
                    src={require('../assets/images/downgrade.png')}
                    size={[25,25]}
                    accent
                />
            </TouchableOpacity>
        </View>
    )
}

function CuisineSelected({navigation, route}){
    navigation.setOptions({
        headerShown: false,
    });
    const pan = useRef(new Animated.ValueXY()).current;
    const nutrition_pan = useRef(new Animated.ValueXY()).current;

    const { item } = route.params;
    const { name , color, cooking_time, prep_time, burn, nutrition,} = item;
    const [capacity, setCapacity] = useState(item.capacity);
    

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
          console.log(sheet_latestoffset)
          if(sheet_latestoffset < -100){
            pan.y.setValue(-100);
          }
          if(sheet_latestoffset > 0){
            pan.y.setValue(0);
          }
        }
      })).current;

    const NutritionPanResponder = useRef( PanResponder.create({
        onMoveShouldSetPanResponder: (_,{dx}) => true,
        onPanResponderGrant: () => {
            
          nutrition_pan.setOffset({
            x: nutrition_pan.x._value
          });

        },
        onPanResponderMove: Animated.event(
            [
              null,
              { dx: nutrition_pan.x }
            ]
          ),
        onPanResponderRelease: () => {
            nutrition_pan.flattenOffset();
            if(nutrition_latestoffset > 200){
                nutrition_pan.x.setValue(200);
            }
            if(nutrition_latestoffset < 0){
                nutrition_pan.x.setValue(0);
            }
        }
      })).current;

      const yAxis = pan.y.interpolate({
        inputRange: [-100,0],
        outputRange: [-100,0],
        extrapolate: 'clamp',
      });

      const xAxis = nutrition_pan.x.interpolate({
        inputRange: [0,200],
        outputRange: [0,200],
        extrapolate: 'clamp',
      });

    useEffect(()=> {
        nutrition_pan.x.addListener(({value}) => nutrition_latestoffset = value);
        pan.y.addListener(({value}) => sheet_latestoffset = value);
    }, [])
      
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
                    <View >
                        <View flex={false} row paddingY={[20]}>
                            <Pic 
                                src={require('../assets/images/chopping-knife.png')}
                                size={[33,33]}
                                marginLeft={25}
                                accent
                            />
                            <Text end family='semi-bold' size={13} thirdary left={0}>{prep_time}</Text>
                            <Text gray3 end family='semi-bold' size={12} thirdary left={0}> preparation</Text>
                        </View>
                        <View flex={false} row paddingY={[20]}>
                            <Pic 
                                src={require('../assets/images/time.png')}
                                size={[25,25]}
                                marginLeft={25}
                                accent
                            />
                            <Text end family='semi-bold' size={13} thirdary left={7}>{cooking_time}</Text>
                            <Text gray3 end family='semi-bold' size={12} thirdary left={0}> cooking</Text>
                        </View>
                        
                        <PeopleView item={item} mainCapacity={setCapacity} />
                        
                        <View flex={false} row paddingY={[20]}>
                            <Pic 
                                src={require('../assets/images/fire.png')}
                                marginLeft={25}
                                size={[25,25]}
                                accent
                            />
                          <Text end family='semi-bold' size={13} thirdary left={7}>{burn}</Text>
                        </View>

                        

                    </View>


                    <View >
                        <Pic src={require('../assets/images/test.png')}
                            resizeMode='contain'
                            size={[250,250]}
                         />

                    </View>


                </View>

                
                <View animated
                    style={ [styles.nutrition,{
                        transform: [
                            {
                                translateX: xAxis
                            }
                        ]  
                    }]}
                    flex={false} absolute {...NutritionPanResponder.panHandlers}>
                    
                    <Pic 
                        resizeMode='contain'
                        src={require('../assets/images/nutrients.png')}
                        size={[120,40]}
                        accent
                    />
                    <Text top={9} left={15} absolute white family='bold' size={16}>Nutrition</Text>   
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
                    <SheetText item={item} capacity={capacity} people={item.capacity} />
            </View>


            <View animated flex={false} size={[200,'100%']} accent 
            style={[styles.nutrients,{
                transform: [
                    {
                        translateX: xAxis
                    }
                ]
            }]} 
            absolute


            {...NutritionPanResponder.panHandlers}>
                
                    {nutrition.map((item, index) => 
                        (
                        <View row flex={false} key={index.toString()} paddingBottom={10}>
                            <Pic    
                                src={item.icon}
                                size={[30,30]}
                                accent
                                tintColor='white'
                                marginRight={5}
                                marginTop={3}   
                            
                            />
                            <Text white size={15} end>{item.weight} </Text>
                            <Text white size={12} end >{item.type}</Text>
                        </View>
                        )
                    )}
                   
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
    },
    nutrients: {
        paddingTop: theme.sizes.padding * 5,
        paddingHorizontal: 20,
        marginLeft: -200,
    },
    nutrition : {
        marginTop: 250,
        marginLeft: -10
    }
});