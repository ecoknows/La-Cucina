import React,{useState, useRef, useEffect} from 'react';
import { View, Text, Pic, Circle, List, Card  } from '../components';
import { PanResponder,StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { theme, directions, ingridients, mocks, } from '../constants';
import { CheckBox } from 'react-native-elements';
import { Easing, set } from 'react-native-reanimated';
import { AddHistory, GetHistory,GetHistroyCapacity, SnapShotListiner,DeleteHistory } from '../database/database'

const DONE = 0;
const START = 1;
const CONTINUE = 2;
const RESTART = 3;

let histor_id = {value: -1};
let current_step = {value: 0};
let oneTimeOnly; 
let ingridents_finish_counter = {value: 0};
let direction_finish_counter = {value: 0};
let length_ingredients;
let length_directions;

let nutrition_latestoffset = 0;
let sheet_latestoffset = 0;
let popUpIsDone;
let isSaving = false;

let original_capacity = {value: 0};
let original_direction = {value: 0};
let original_ingridients = {value: 0};


let isDataFetch = {value: false};
let _ingredients_changer = {array: []};

let last_save_date = {value : ' '};
let last_time_finished = {value : ' '};
let last_image = {value : 0};
let last_index = {value : 0};
let last_mocks_tabs = {value : 0};

let latest_check_ingridients;

const SAVE = 1;
const BACK = 2;

let open_nutrition;

function SheetText(props){
    const [ isDirection, setDirection ] = useState(false);
    const [isIndicator, setIsIndicator] = useState(true);
    const [isCurrentStepState, setIsCurrentStepState] = useState(START);
    const { item,capacity, people, navigation, setCapacity,setRestart,reset,ExistHistory } = props 
    const { direction, ingridients } = item;
    //console.log(ingridients);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const moveAnim = useRef(new Animated.Value(0)).current;
    
    
    useEffect(()=> {
        oneTimeOnly= true;
        current_step = {value: 0};
        ingridents_finish_counter.value = 0;
        direction_finish_counter.value = 0;
        isDataFetch.value = false;
        _ingredients_changer.array = [];
        original_direction.value = 0;
        original_ingridients.value = 0;
        histor_id.value = -1;
        
        length_ingredients = ingridients.length;
        length_directions = direction.length;
        
        const getHistory_Params = {
            id: item.id,
            current_step,
            setCapacity,
            ingridients,
            setIsCurrentStepState,
            isCurrentStepState,
            isDataFetch, 
            original_direction,
            original_ingridients,
            _ingredients_changer,
            ingridents_finish_counter,
            direction_finish_counter,
            last_save_date,
            last_time_finished,
            last_image,
            last_index,
            last_mocks_tabs,
            ExistHistory,
            histor_id
        }

        GetHistory(getHistory_Params);

        
        popUpIsDone = length_ingredients == ingridents_finish_counter.value ? false : true; 
        
    },[reset]);

    
    if(isDirection && oneTimeOnly){
        navigation.navigate('InfoModal',{info: {text: 'Make sure your ingredients \n are ready ^_^'},
        button:[ {title: 'ok'}]
    })
        oneTimeOnly = false;
    }

    const IndicatorClick =()=>{
        direction_finish_counter.value = isCurrentStepState == DONE?  direction_finish_counter.value + 1 : direction_finish_counter.value;
        setIsIndicator(isIndicator ? false : true);
        setIsCurrentStepState( isCurrentStepState ? DONE : START);
        if(isCurrentStepState == DONE)
            current_step.value++;
    }


    const SheetListView = props => {

        const {item, index} = props;
        const [checked, setChecked] = useState(item.checked);
        
        const CheckBoxClick =()=>{
            if(!latest_check_ingridients.has(index.toString()))
                latest_check_ingridients.add(index.toString());
            else if (latest_check_ingridients.has(index.toString()))
                latest_check_ingridients.delete(index.toString());

            ingridents_finish_counter.value = !checked ? ingridents_finish_counter.value+1 : ingridents_finish_counter.value-1;
            setChecked(checked ? false : true);
            item.checked = checked ? false : true;
            if(item.checked){
                _ingredients_changer.array.push(index);
            }else{
                let test = [index];
                _ingredients_changer.array = _ingredients_changer.array.filter(value => !test.includes(value));
            }
            
        }
        
        const PopUpMessage =(props)=>{
            
            Animated.timing(moveAnim,
            {
            toValue: -200,
            duration: 6000,
            easing: Easing.linear(),
            }).start();


            Animated.sequence([
            Animated.timing(fadeAnim,
                {
                toValue: 1,
                duration: 3000,
                easing: Easing.linear(),
                })
                ,
                Animated.timing(fadeAnim,
                {
                    toValue: 0,
                    duration: 3000,
                    easing: Easing.linear(),
                }  
                )

            ]).start(); 
            popUpIsDone = false;

            return(
                <View animated flex={false} absolute marginX={[-15]}
                style={{
                    opacity: fadeAnim,
                    transform: [{
                        translateY: moveAnim,
                    }]
                }}
                >
                    <Card borderWidth={2} borderColor={theme.colors.accent} borderRadius={7} white size={[70,25]} justifyContent='center' alignItems='center'>
                            <Text accent size={12} asemi_bold>Done! ^.^</Text>
                    </Card>

                </View> 
            );


        }

        let itemColor = null;
        let isCircle = true;
        if ( current_step.value == index && isCurrentStepState == DONE && isDirection) {
            itemColor = theme.colors.accent;
        } else if ( current_step.value > index  && isDirection){
            itemColor = '#18A623';
            isCircle = false;
        }else{
            itemColor = theme.colors.thirdary;
        }
        const isActive = current_step.value == index ? true : false;
        const Indicator = (isActive && isDirection) ? 
        <View flex={false} size={[33]}>
            <Text size={12} color='#18A623' family='bold' touchable press={IndicatorClick}>
                {isIndicator ? 'Start' : 'Done'}
            </Text>
        </View> : null;
        let SideTextIndicator = null;
        let FloatingCongrats = null;
        let DoneInfo = null;
        let ValueText = null;
        let textLeft = 5;
        
        if(isDirection){
            if(!isCircle){
                SideTextIndicator = <Pic src={require('../assets/images/check.png')} resizeMode='cover' size={[20,20]}/>
            }else {
                SideTextIndicator =   <Circle color={itemColor == theme.colors.thirdary ? theme.colors.accent : itemColor } size={7} marginY={[5]}/>;
            }

            DoneInfo = (length_directions == direction_finish_counter && index == length_directions-1) ? 
                <Text accent size={13} family='semi-bold'> Finish in 30 mins</Text>
            :
            null;

        }else{
            SideTextIndicator =  <CheckBox checked={checked} checkedColor='green' uncheckedColor='green' size={18} containerStyle={{height: 10 ,width:30, paddingEnd: 10, marginLeft: -25, marginTop: 1,}} onPress={CheckBoxClick}/>
            textLeft = -5;
            itemColor = checked ? '#18A623' : theme.colors.thirdary;
            if(item.value != -1){
                let value = Math.round( ((item.value/ people)*(capacity-people) + item.value) * 100) / 100;
                value =( ( (value % 1) == 0.5  ) && value - 0.5 != 0)? ( (value - 0.5).toString() +' 1/2' ): value;
                value =( ( (value % 1) == 0.75  ) && value - 0.75 != 0)? ( (value - 0.75).toString() +' 3/4' ): value;
                value =( ( (value % 1) == 0.125  ) && value - 0.125 != 0)? ( (value - 0.125).toString() +' 1/8' ): value;
                value =( ( (value % 1) == 0.25  ) && value - 0.25 != 0)? ( (value - 0.25).toString() +' 1/4' ): value;
                value = value == 0.25 ? '1/4' : value;
                value = value == 0.125 ? '1/8' : value;
                value = value == 0.75 ? '3/4' : value;
                value = value == 0.5 ? '1/2' : value;
                ValueText =  <Text size={14} color={itemColor} left={textLeft} family='semi-bold'>{value} </Text>    
            }
            textLeft = 0;
            FloatingCongrats = (checked && ingridents_finish_counter.value == length_ingredients && popUpIsDone) ? 
            <PopUpMessage/>
            : 
            null;
        
        }
        


        return(
            <View row>
            {Indicator}
            <View row marginY={[0,20]} marginX={[ (isActive && isDirection) ? 15 : 50 ,30]} >
                
                {SideTextIndicator}
                {ValueText}
                <View flex={false} marginLeft={textLeft}>
                    <Text size={14} color={itemColor}family='semi-bold'>{item.step}</Text>
                    {DoneInfo}
                </View>
                {FloatingCongrats}
            </View>

            </View>
        );
    }

    return(
        <View marginY={[50]} marginX={[theme.sizes.margin * 2,theme.sizes.margin * 2]} >
            <View flex={false} row center marginY={[10,theme.sizes.margin*2]}>
                
               <Text 
                touchable
                tFlex={1}
                press={()=>setDirection(false)}
                size={19} 
                abold
                accent={!isDirection}
                secondary={isDirection}
                center
                >Ingredients</Text>

                <Text 
                size={19} 
                abold
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
                data={isDirection ? direction : ingridients }
                renderItem={({ item, index }) =>  <SheetListView item={item} index={index}/>
                }
                keyExtractor={(item,index)=>index.toString()}
                
                contentContainerStyle={{paddingBottom: 200}}
            />

        </View>
    );
}

function PeopleView(props){
    const {item, mainCapacity,reset} = props;
    const [capacity, setCapacity] = useState(props.capacity);
    
    useEffect(()=>{
        setCapacity(props.capacity)
        GetHistroyCapacity(item.id, setCapacity, original_capacity);
    },[reset])

    useEffect(()=>{
        mainCapacity(capacity);
    },[capacity])
    
    return(
        <View flex={false} row paddingY={[20]}>
            <TouchableOpacity onPress={()=>{
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
            <Text end asemi_bold size={14} thirdary left={7}>{capacity}</Text>
            <Text end asemi_bold size={14} thirdary> people</Text>
            <TouchableOpacity onPress={()=>{
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
    const pan = useRef(new Animated.ValueXY()).current;
    const nutrition_pan = useRef(new Animated.ValueXY()).current;

    const { item } = route.params;
    const { id,name , color, cooking_time, prep_time, burn, nutrition, favorite, image,mocks_tabs,index,title_size} = item;
    const [capacity, setCapacity] = useState(item.capacity_cache.value != null ? item.capacity_cache.value : item.capacity);
    const [reset, setReset] = useState(false);

    const ExistHistory =()=> {
        const sum_of_dir_ing = ingridents_finish_counter.value + direction_finish_counter.value;
        let percentage_finish = sum_of_dir_ing != 0? sum_of_dir_ing / (length_ingredients+length_directions) : 0;
        let percent = Math.round((percentage_finish.toFixed(2) * 100));
        const item_date = new Date(last_save_date.value);
        const monthsText = ['Jan','Feb','March','April','May','Jun','July','Aug','Sept','Oct','Nov','Dec'];
        const display_date = monthsText[item_date.getMonth()] + ' ' + item_date.getDate() + ', ' + item_date.getFullYear();
        let hour = item_date.getHours();
        let minutes = item_date.getMinutes();
        minutes = minutes < 10 ?  '0' + minutes : minutes;
        hour = (hour >= 13 ) ? (hour - 12) : hour;
        const std = (hour >= 12 )? 'PM': 'AM';
        let time = hour + ':' + minutes +' '+ std;
        console.log(' wat ' , hour);
        if(percent > 0 && percent < 100 ){
            navigation.navigate('InfoModal',{info: 
            {
            text: 'Unfinished cuisine on \n'+display_date+' at ' +time+'\nwant to continue it ? ^.^'
            }, 
            button: [
                {
                    title: 'Continue',
                    purpose: CONTINUE,
                },
                {
                    title: 'Start Over',
                    navigate: 'CuisineSelected',
                    purpose: RESTART,
                }
                ],  
            exit: false,
            })
        }

    }
    
    const RestartCuisine = () =>{
        current_step.value = 0;
        oneTimeOnly = true
        ingridents_finish_counter.value = 0;
        direction_finish_counter.value = 0;
        length_ingredients
        popUpIsDone = length_ingredients == ingridents_finish_counter.value ? false : true; 
        original_direction.value = 0;
        original_ingridients.value = 0;
        original_capacity.value = item.capacity;
        isDataFetch.value = false;
        _ingredients_changer.array = [];
        last_save_date.value = ' ';
        last_time_finished.value = ' ';
        last_image.value = 0;
        last_index.value = 0;
        last_mocks_tabs.value = 0;
        latest_check_ingridients = new Set();
        open_nutrition = false;
        setCapacity(item.capacity);
        for(let i = 0; i < item.ingridients.length; i++){
            item.ingridients[i].checked = false;
        }
        SnapShotListiner.history = true;
        DeleteHistory(histor_id.value,setReset,reset);
    }
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
            if(nutrition_latestoffset > 80){
                OpenNutrition(true);
            }else{
                OpenNutrition(false);
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

    const OpenNutrition =(des)=>{
        Animated.timing(nutrition_pan.x,{
            toValue: des ? 200 : 0,
        }).start();
    }

    const NutritionClick =()=>{
        if(open_nutrition == false){
            OpenNutrition(true);
            open_nutrition = true;
        }else{
            OpenNutrition(false);
            open_nutrition = false;
        }
        
    }

    useEffect(()=> {
        open_nutrition = false;
        latest_check_ingridients = new Set();
        original_capacity.value = item.capacity;
        nutrition_pan.x.addListener(({value}) => nutrition_latestoffset = value);
        pan.y.addListener(({value}) => sheet_latestoffset = value);
        return () => {
            nutrition_pan.x.removeAllListeners();
            pan.y.removeAllListeners();
            item.capacity_cache.value = original_capacity.value;
            if(!isSaving)
                for (let i of latest_check_ingridients){
                    item.ingridients[parseInt(i)].checked = item.ingridients[parseInt(i)].checked ? false : true;
                }
            isSaving = false;
        }
    }, [reset])

    useEffect(()=>
    {
        if(route.params?.modal){
            switch(route.params.modal){
                case SAVE:
                    const newDate = new Date().toISOString();
                    const sum_of_dir_ing = ingridents_finish_counter.value + direction_finish_counter.value;
                    let percentage_finish = sum_of_dir_ing != 0? sum_of_dir_ing / (length_ingredients+length_directions) : 0;
                    let percent = Math.round((percentage_finish.toFixed(2) * 100)).toString() + '%';
                    SnapShotListiner.history = true;
                    const data = {
                        id: histor_id.value,
                        parent_id: id,
                        favorite,
                        capacity,
                        newDate,
                        time_finished: percent,
                        image: image,
                        index,
                        mocks_tabs,
                        directions: current_step.value,
                        ingredients: _ingredients_changer.array.toString(),
                    }
                    AddHistory(data,isDataFetch,original_capacity.value == capacity, original_direction.value == current_step.value, newDate == last_save_date.value,percent == last_time_finished.value, last_image.value == image, last_index == index, last_mocks_tabs == mocks_tabs);
                    
                    if(route.params?.data_change){
                        route.params.data_change.value = true;
                    }
                    isSaving = true;
                    if(percent == '100%'){  
                        for(let i = 0; i < item.ingridients.length; i++){
                            item.ingridients[i].checked = false;
                        }
                    }
                    navigation.goBack();
                    break;
                
                case RESTART:
                    RestartCuisine();
                    break;
                case BACK:
                    navigation.goBack();
                    break;

            }
        }

    },[route.params?.modal])

    const BackButtonClick =()=>{
        if(ingridents_finish_counter.value != original_ingridients.value
            || direction_finish_counter.value != original_direction.value || capacity != original_capacity.value ){
            navigation.navigate('InfoModal',{info: {text: 'Do you want to save it? ^_^'}, 
            button: [
                {
                    title: 'Yes',
                    navigate: 'CuisineSelected',
                    purpose: SAVE,
                },
                {
                    title: 'No',
                    navigate: 'CuisineSelected',
                    purpose: BACK,
                }
                ],
            exit: true,
            })
        }else
            navigation.goBack();
    }
      
    return(
        <View color={color}  >
        <View flex={false} row style={{alignSelf: 'flex-end', marginTop: 25, marginRight: 15}}>
            
            
            <View touchable flex={false}
            press={BackButtonClick}>
                <Pic 
                size={[30,30]}
                src={require('../assets/icons/x.png')} 
                />
            </View>

        </View>
            <View flex={1} paddingX={[theme.sizes.padding]} >
                
                <View flex={false}>
                    <Text size={title_size + 6} abold color='#322C2C' >{name}</Text>
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
                            <Text end asemi_bold size={14} thirdary left={0}>{prep_time}</Text>
                            <Text gray3 end asemi_bold size={13} left={0}> preparation</Text>
                        </View>
                        <View flex={false} row paddingY={[20]}>
                            <Pic 
                                src={require('../assets/images/time.png')}
                                size={[25,25]}
                                marginLeft={25}
                                accent
                            />
                            <Text end asemi_bold size={14} thirdary left={7}>{cooking_time}</Text>
                            <Text gray3 end asemi_bold size={13} thirdary left={0}> cooking</Text>
                        </View>
                        
                        <PeopleView item={item} mainCapacity={setCapacity} capacity={capacity} reset={reset} />
                        
                        <View flex={false} row paddingY={[20]}>
                            <Pic 
                                src={require('../assets/images/fire.png')}
                                marginLeft={25}
                                size={[25,25]}
                                accent
                            />
                          <Text end asemi_bold size={14} thirdary left={7}>{burn}</Text>
                        </View>

                        

                    </View>


                    <View touchable activeOpacity={1} press={()=> navigation.navigate('ImageModal',{image})} >
                        <Pic src={image}
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
                    <TouchableOpacity activeOpacity={1} flex={0} onPress={NutritionClick}>
                        <Pic 
                            resizeMode='contain'
                            src={require('../assets/images/nutrients.png')}
                            size={[120,40]}
                            accent
                            onPress={()=>console.log('afafafa')} 
                        />
                        <Text top={9} left={15} absolute white family='bold' size={16}>Nutrition</Text> 
                    </TouchableOpacity>  
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
                    <SheetText ExistHistory={ExistHistory} item={item} capacity={capacity} setCapacity={setCapacity} people={item.capacity} navigation={navigation} reset={reset}/>
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
        width: 150,
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