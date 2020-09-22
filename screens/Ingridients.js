import React,{useState, useEffect, useRef} from 'react';
import { View, List,Text, Card, Circle, Pic } from '../components';
import { ScrollView } from 'react-native-gesture-handler';
import { theme, tabs } from '../constants';
import { CheckBox } from 'react-native-elements';
import { AddNote, DropTable,SeeData,NextDataSelect ,InitialData, DataPos, UpdateTable, QueryChanges, QueryChangesList, SelectCheckList, SetFirstNote, GetFirstNote, RemovePos, RemoveNote } from '../database/database'
import { PanResponder, Animated, Dimensions } from 'react-native';

let _1_data = true;
let _2_data = true;
let _1_latest_offset_data = 0;
let _2_latest_offset_data = 0;
let id_latest = {value : 1};

let isTutorial = false, swipeTut = true;
let tutorialLevel = -1, TutDelayTime = 1000, tutStart = false;
const TUTORIAL = 0;
const {width, height} = Dimensions.get('window');
function TutorialFinger(props){
    const animated = useRef(new Animated.Value(1.1)).current;
    const swipe_animated = useRef(new Animated.Value(0)).current;
    let circle_trans = null;
    const { swipe, tap, upward } = props;
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

        
const ProceedTutorial =(navigation)=>{
    navigation.navigate('InfoModal',{info: 
        {
        text: 'Test',
        }, 
        button: [
            {
                title: 'Ok',
                navigate: 'Ingridients',
                purpose: TUTORIAL,
            },
            ],  
        exit: false,
        });
}
function Ingridients({navigation, route}){

    const [stateData1, setStateData1] = useState([]);
    const [stateData2, setStateData2] = useState([]);
    const [isFirstRow,setIsFirstRow] = useState(true);
    const [firstItem, setFirstItem] = useState(null);
    const monthsText = ['Jan','Feb','March','April','May','Jun','July','Aug','Sept','Oct','Nov','Dec'];
    const date =  new Date().getDate() +" " + monthsText[new Date().getMonth()];
    const fSwipe = useRef(new Animated.ValueXY()).current;
    const [refresh, setRefresh] = useState(false);
    const scrollRef = useRef();
    
    const TutorialModal =()=>{
        navigation.navigate('InfoModal',{info: 
            {
            text:'You have current tutorial at ' + tabs.tutorial.current + '\ntab I will navigate you back'
            }, 
            button: [
                {
                    title: 'Ok',
                    navigate: tabs.tutorial.current
                },
                ],  
            exit: false,
            });
    }
    
    const StartTutorial =()=>{
        navigation.navigate('InfoModal',{info: 
            {
            text: 'Hello! there ^.^ \nbefore you start using the app\nyou will have a short tutorial.'
            }, 
            button: [
                {
                    title: 'Ok',
                    navigate: 'Ingridients',
                    purpose: TUTORIAL,
                },
                ],  
            exit: true,
            });
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
    
    if(isTutorial && tutorialLevel == 4 ){
        ProceedTutorial(navigation);
    }

    useEffect(()=>{
        if(tabs.tutorial.current != null){
            const unsubscribe = navigation.addListener('focus', () => {
                if(!tabs.tutorial.ingridients){
                    tabs.variables.active = tabs.tutorial.curr_num;
                    tabs.variables.tutorial_proceed = true;
                    TutorialModal();
                }
                if(tabs.tutorial.ingridients && tabs.tutorial.current == 'Ingridients' && tutorialLevel == -1 && !isTutorial){
                    isTutorial = true;
                    tabs.variables.active = 1;
                    tabs.variables.tutorial_proceed = true;
                    StartTutorial();
                }
            });

            return unsubscribe;
        }
    },[navigation]);

    useEffect(()=> {
        if(stateData1.length != 0 && _1_data){
            
            for(let i = _1_latest_offset_data; i < stateData1.length; i++){
                SelectCheckList(stateData1[i],stateData1,setStateData1, i);
            }
            _1_latest_offset_data = stateData1.length;
            //_1_id_latest_data = stateData1[0].id+1;
            _1_data = false;
        }
    },[stateData1]);
    
    useEffect(()=> {
        if(stateData2.length != 0 && _2_data){
            
            for(let i = _2_latest_offset_data; i < stateData2.length; i++){
                SelectCheckList(stateData2[i],stateData2,setStateData2, i);
            }
            
            _2_latest_offset_data = stateData2.length;
            //_2_id_latest_data = stateData2[0].id+1;
            _2_data = false;
        }
    },[stateData2]);

  //DeleteAll();
  //DropTable();
  //RemovePos();
   // SeeData();
    useEffect(() => {
       GetFirstNote(setFirstItem);
       InitialData({setStateData1, setStateData2, setIsFirstRow, stateData1, stateData2, id_latest });
        if (route.params?.post) {
            const {index, post, type} = route.params; 

            if(index == -1){
                const setData = isFirstRow ? setStateData1 : setStateData2;
                id_latest.value++;
                setData(items=>[post,...items])
                DataPos(isFirstRow ? '0': '1');
                setIsFirstRow(!isFirstRow); 
                AddNote(post);
            }else{
                let updateData = null, save = null;
                switch(type){
                    case 0: 
                        setFirstItem([post]);
                        SetFirstNote(post);
                        break;
                    case 1: 
                        updateData = stateData1;
                        save = updateData[index];
                        updateData[index] = post;
                        console.log(save, ' gagaga = ', post)
                        setStateData1( items=>[...updateData]);
                        UpdateTable(QueryChanges({save, post}), post.id.toString(),1);
                        QueryChangesList({save, post});
                        break;
                    case 2: 
                        updateData = stateData2;
                        save = updateData[index];
                        updateData[index] = post;
                        setStateData2( items=>[...updateData]);
                        UpdateTable(QueryChanges({save, post}), post.id.toString(),1);
                        QueryChangesList({save, post});
                        break;
                }
                
            }      
        }
    }, [route.params?.post]);


    const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
        const paddingToBottom = 10;
        return layoutMeasurement.height + contentOffset.y >=
          contentSize.height - paddingToBottom;
    };

    const CheckList =props=>{
        const { item, stateData, mainIndex,isFirst, type} = props;
        const { data, setData } = stateData;

        const changeChecked =(index)=>{
            if(isTutorial && tutorialLevel == 1){
                ProceedTutorial(navigation);
            }
            if(isFirst){
                item.checkList[index].status = item.checkList[index].status ? 0 : 1;
                SetFirstNote(item);
                return;
            }
            setTimeout(()=>{
                let updatedData = data;
                updatedData[mainIndex].checkList[index].status = updatedData[mainIndex].checkList[index].status ? 0 : 1;
                UpdateTable(" status = " + updatedData[mainIndex].checkList[index].status, updatedData[mainIndex].checkList[index].id,2);
                setData(items=> [...updatedData]);
            }, 1)
            
        }
        
        const CheckItemView =props=>{
            const { item,index } = props;
            const [checked, setChecked] = useState(item.status? true: false);
            return(
                <View row paddingRight={40} >
                {item._text == '' ? null : <CheckBox checked={checked} size={20} checkedColor='white' uncheckedColor='white'  containerStyle={{width: 30,height: 20, marginLeft: -10}} 
                    onPress={()=> { setChecked(checked ? false : true); changeChecked(index); }}
                    />}
                {item._text == '' ? null : <Text size={12} white family='bold' top={5} left={-3}>
                             {item._text}</Text>}
                
                {isTutorial && index == 0 && type == 1 && mainIndex == 0 && tutorialLevel == 1 ? <TutorialFinger style={{zIndex: 1, left: width * -0.04, top: height * 0.04}} tap/>: null}

                </View>
            );  
        }

        if(item.checkList != null){
            return( // TO DO:  improve the slice!!
                item.checkList.slice(0,5).map( (item, index) => <CheckItemView key={index.toString()} item={item} index={index}/> )      
            );
        }
        return null
    }

    const NoteListView =props=>{
        const {item, index, data, setData, type,data2, setData2 } = props;
        const swipe = useRef(new Animated.ValueXY()).current;
        const maxNoteLineLength = item.checkList != null ? item.checkList.length >= 5 ? 2 : 10 : 10;

        const animationOut =()=>{
            Animated.timing(swipe,{
                toValue: 0,
            }).start();
        }
            
        const swipeResponder = useRef( PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                swipe.setOffset({
                x: swipe.x._value
            });
            },
            onPanResponderMove: Animated.event(
            [
                null,
                { dx: swipe.x }
            ]
            ),
            onPanResponderRelease: (_, {dx}) => {
            swipe.flattenOffset();
                if(dx < 100 && dx > -100)
                    animationOut();
                else{
                    let isGreater = data.length > data2.length ? 0 : 1;
                    const data2_toSwap = data2.slice(index+isGreater, data2.length);
                    let firstRow = false;
                    if(type == 1){
                        firstRow = true;
                    }
                    
                    if(data2_toSwap.length == 0 ){
                        RemoveNote(data[index].id);
                        const dataTochange = [data[index]];
                        const modified = data.filter(value=> !dataTochange.includes(value));    
                        setData(modified);
                    }else{
                        RemoveNote(data[index].id);
                        const data1_toSwap = data.slice(index+1, data.length);
                        const data1_modi = [...data.slice(0, index), ...data2_toSwap];
                        const data2_modi = [...data2.slice(0, index+isGreater), ...data1_toSwap];
                        setData(data1_modi);
                        setData2(data2_modi);
                    }
                    NextDataSelect(setStateData1,setStateData2,"1");
                    if(isTutorial && tutorialLevel == 2){
                        ProceedTutorial(navigation);
                    }
                }
            }
        })).current;

        return(
            <View animated flex={false} marginBottom={8} width='85%' end marginRight={type == 1 ? 5 : 20} 
            {...swipeResponder.panHandlers}
            style={{
                opacity: swipe.x.interpolate({
                    inputRange: [-100,0, 100],
                    outputRange: [0,1,0],
                    extrapolate: 'clamp',
                }),
                transform: [{
                translateX: swipe.x.interpolate({
                    inputRange: [-70,0, 70],
                    outputRange: [-70,0, 70],
                    extrapolate: 'clamp',
                })
            }]}}
            >
                <Card activeOpacity={1} inTouchable round={25} color={item.color} padding={theme.sizes.padding} accent 
                    inPress={()=>{
                        if(isTutorial && tutorialLevel != 4)
                         return;
                        navigation.navigate('NoteEditor',{currentNote: item, index, type})
                    } }>
                {item.title == ''? null :<Text size={18} white family='bold' bottom={theme.sizes.padding/2}>{item.title}</Text>}
                {(item.isNote)? item.note == '' ? null : <Text size={11} white family='semi-bold' bottom={10} numberOfLines={maxNoteLineLength} ellipsizeMode='tail'>{item.note}</Text> : null }
                {item.isCheckList ? <CheckList item={item}  mainIndex={index} stateData={{data,setData}} type={type} /> : null}
                    <Text size={12} white end top={20}>{item.date}</Text>
                    
                </Card>
                {isTutorial && index == 0 && type == 1 && tutorialLevel == 2 ? <TutorialFinger style={{zIndex: 1,left:0, top : height * 0.15}} swipe/>: null}
                {isTutorial && index == 1 && type == 1 && tutorialLevel == 5 ? <TutorialFinger style={{zIndex: 1,left:0, top : height * 0.15}} tap/>: null}
            </View>
        )
    }

    const animationOutFirstNote =()=>{
        Animated.timing(fSwipe,{
            toValue: 0,
        }).start();
    }
        
    
    const firstSwipeRespomder = useRef( PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
            fSwipe.setOffset({
            x: fSwipe.x._value
        });
        },
        onPanResponderMove: Animated.event(
        [
            null,
            { dx: fSwipe.x }
        ]
        ),
        onPanResponderRelease: (_, {dx}) => {
            fSwipe.flattenOffset();
            animationOutFirstNote()
            
        }
    })).current;

    const firstItemMaxNoteLineLength = firstItem != null ? firstItem[0].isCheckList != null ? firstItem[0].checkList.length >= 5 ? 2 : 10 : 10 : 10;


    return(
        <View white>
            <View paddingTop={30} row>
                
                <ScrollView
                  ref={scrollRef}
                  onScroll={({nativeEvent}) => {
                    
                    if (isCloseToBottom(nativeEvent)) {
                        _1_data = true;
                        _2_data = true;
                        NextDataSelect(setStateData1,setStateData2,"6");
                   }

                   if(isTutorial && tutorialLevel == 0 && swipeTut){
                    swipeTut = false;
                    setTimeout(()=>{
                        ProceedTutorial(navigation);
                        scrollRef.current.scrollTo({y:0,animated : true});
                    },TutDelayTime)
                   }
                   
                }
                  }
                  scrollEventThrottle={400}
                >
                    
                {isTutorial && tutorialLevel == 0? <TutorialFinger style={{zIndex: 1,alignSelf:'center', top: height * 0.5}} swipe upward />: null}

                {
                    firstItem != null ? 
                    <View animated flex={false} marginX={[20,20]} marginBottom={8}
                    style={
                        {
                           opacity: fSwipe.x.interpolate({
                               inputRange: [-100,0, 100],
                               outputRange: [0,1,0],
                               extrapolate: 'clamp',
                           }),
                           transform: [{
                           translateX: fSwipe.x.interpolate({
                               inputRange: [-70,0, 70],
                               outputRange: [-70,0, 70],
                               extrapolate: 'clamp',
                           })
                           }]
                        }
                    }
                    {...firstSwipeRespomder.panHandlers}
                    >
                        <Card activeOpacity={1} inTouchable round={25} color={firstItem[0].color} padding={theme.sizes.padding} accent
                            inPress={()=>navigation.navigate('NoteEditor',{currentNote: firstItem[0], index: 0, type : 0}) }
                            
                            >
                            {firstItem[0].title == '' ? null :<Text size={18} white family='bold' bottom={theme.sizes.padding/2}>{firstItem[0].title}</Text>}
                            {firstItem[0].note == '' ? null :<Text size={11} white family='semi-bold' numberOfLines={firstItemMaxNoteLineLength}>{firstItem[0].note}</Text>}
                            {firstItem[0].isCheckList ? <CheckList item={firstItem[0]}  mainIndex={0} stateData={{data: firstItem,setData: setFirstItem}} isFirst={true}/> : null}
                            <Text size={12} white family='bold' >{null}</Text>
                            <Text size={12} white end top={20}>12 Feb</Text>
                        </Card>
                    </View>
                        
                    : 
                    null 
                }
                    
                <View row flex={1}>

                        <View flex={1} >
                            {stateData1.map(
                                (item,index) => <NoteListView key={index.toString()} type={1} item={item} index={index} data={stateData1} setData={setStateData1}
                                    data2={stateData2} setData2={setStateData2}
                                />
                            )}
    
                        </View>

                        <View flex={1} >
                            {stateData2.map(
                                (item,index) =>  <NoteListView key={index.toString()} type={2} item={item} index={index} data={stateData2} setData={setStateData2}
                                data2={stateData1} setData2={setStateData1}
                                />
                             )}

                        </View>
                        

                    
                </View>


                </ScrollView>

            </View>
            
            <View absolute center middle bottom={0} size={['100%','5%']}>
                <Card touchable round={50} white size={[100]} center middle 
                    style={{
                        borderWidth: 2,
                        borderColor: theme.colors.accent
                    }}
                    press={()=> {
                        if(tutorialLevel != 3 && isTutorial) {
                            return;
                        }
                        navigation.navigate('NoteEditor',{currentNote: {id: id_latest.value,title: '', note: '', date ,isNote: true,isCheckList: false , color: theme.colors.semi_accent, checkList: [{_text:'', status: false}]}, index: -1})
                    }}
                >
                    <Text family='semi-bold' size={18} accent>Create</Text>
                {isTutorial && tutorialLevel == 3? <TutorialFinger style={{zIndex: 1,top : -height * 0.08, transform:[{rotate: '180deg'}]}} tap/>: null}
                </Card>
            </View>
            
        </View>
    );
}

export default Ingridients;