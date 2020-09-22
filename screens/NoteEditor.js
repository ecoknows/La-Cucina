import React,{useState, useRef, useEffect} from 'react';
import { View, Input, Text, Pic, Circle, List } from '../components';
import { theme } from '../constants';
import {TouchableOpacity,ScrollView, Dimensions, Animated, Easing, Keyboard} from 'react-native';
import { CheckBox } from 'react-native-elements';
import { AddNote, SelectNote, DeleteAll, DropTable } from '../database/database'

const { height, width } = Dimensions.get('screen');
let open = null;
let changesCnt = 0;
let currentCheckListIndex = 0;

let isTutorial = true,TutDelayTime = 1000;
let tutorialLevel = -1, swipeTut = true,tutStart = false;
let TUTORIAL = 0;


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
                navigate: 'NoteEditor',
                purpose: TUTORIAL,
            },
            ],  
        exit: false,
        });
}

function NoteEditor({navigation, route}){
    const { currentNote, index, type} = route.params;
    const checkList = currentNote.checkList != null?  currentNote.checkList.map(a => ({...a})) : [{_text:'', status: false}];
    const [ title, setTitle] = useState(currentNote.title);
    const [ note, setNote] = useState(currentNote.note);
    const [noteColor, setNoteColor] = useState(currentNote.color);
    const [checked, setChecked] = useState(currentNote.isCheckList);
    const [stateCheckedData, setStateCheckedData] = useState(checkList);
    const [isNote, setIsNote] = useState(currentNote.isNote);
    const colorWheel = useRef(new Animated.Value(0)).current;

    const scrollViewAnimated = useRef(new Animated.Value(height - (height * 0.1))).current;


    const StartTutorial =()=>{
        navigation.navigate('InfoModal',{info: 
            {
            text: 'Hello! there ^.^ \nbefore you start using the app\nyou will have a short tutorial.'
            }, 
            button: [
                {
                    title: 'Ok',
                    navigate: 'NoteEditor',
                    purpose: TUTORIAL,
                },
                ],  
            exit: true,
            });
    }
    
    useEffect(()=>{
        open = false;
        changesCnt = 0;
        currentCheckListIndex = 0;
        if(isTutorial && tutorialLevel == -1)
        StartTutorial();
        const keyboardListener = Keyboard.addListener('keyboardDidHide', ()=>{scrollViewAnimated.setValue(height - (height * 0.1))});
        return () => {keyboardListener.remove()}
    },[]);

    const colorOpen =()=> {

        Animated.timing( colorWheel,{
            toValue:  -100,
            duration: 1000
        }).start();
    
    }

    const colorClose =()=> {

        Animated.timing( colorWheel,{
            toValue:  0,
            duration: 1000,
            easing: Easing.linear
        }).start();
    
    }

    const checkData =()=>{
        if(isTutorial && tutorialLevel != 11){
            return;
        }
        if(title == currentNote.title
        && note == currentNote.note
        && noteColor == currentNote.color
        && (checked == currentNote.isCheckList || (checked && (stateCheckedData.length == 1 && stateCheckedData[0]._text == '') ) || (checked && (stateCheckedData.length == 0)))
        && changesCnt <= 0)
        {
            if(isTutorial){
                navigation.navigate('Ingridients',{modal:TUTORIAL});
                isTutorial = false;
            }else{
                navigation.goBack();
            }
        }else{
            const current = {
                id: currentNote.id, 
                title,
                note,
                color: noteColor,
                date: currentNote.date,
                checkList: stateCheckedData.length == 0 ?  [{_text:'', status: false}] : stateCheckedData,
                isCheckList: checked,
                isNote: isNote,
            }
            console.log('asdasf  fsf ', isTutorial);
            if(isTutorial){
                navigation.navigate('Ingridients',{post:
                    current,
                    index,
                    type,
                    modal : TUTORIAL,
                });
                isTutorial = false;
            }else{
                navigation.navigate('Ingridients',{post:
                    current,
                    index,
                    type,
                });
            }
        }

        if(isTutorial && tutorialLevel == 11){
            ProceedTutorial(navigation);
        }
        
    }

    // TextInput Tutorial Checker

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

    if(isTutorial){
        switch(tutorialLevel){
            case 0: 
                if(title != ''){
                    ProceedTutorial(navigation);
                }
                break;
            case 1:
                if(note != ''){
                    ProceedTutorial(navigation);
                }
                break;
        }
    }
    if(isTutorial && tutorialLevel == 0 && title != ''){
        ProceedTutorial(navigation);
    }
    function CheckedList(props){
        const { item, index} = props;
        const [text, setText] = useState(item._text);
        const [checkedIndivid, setCheckedIndivid] = useState(item.status? true : false);
        const [isChange, setIsChange] = useState(true);
        
        
        const changeCheckedState =()=>{
            if(currentNote.checkList[index] != null){
                const currentListStatus = currentNote.checkList[index].status ? true : false;
                changesCnt = (!checkedIndivid == currentListStatus) ? changesCnt-1 : changesCnt+1;
                changesCnt = (changesCnt < 0) ? 0 : changesCnt; 
            }
            setCheckedIndivid(checkedIndivid?false : true);
            let updateData = stateCheckedData;
            updateData[index].status = stateCheckedData[index].status ? 0 : 1;
            if(isTutorial && tutorialLevel == 4){
                ProceedTutorial(navigation);
            }
        }

        const changeTextState =textChanged=>{
            if(currentNote.checkList[index] != null && item.id != undefined){
                
                if(isChange && textChanged != currentNote.checkList[index]._text ){
                    changesCnt++;
                    setIsChange(false);
                }

                if(!isChange && textChanged == currentNote.checkList[index]._text ){
                    changesCnt--;
                    setIsChange(true);
                }

            }

            setText(textChanged);
            stateCheckedData[index]._text = textChanged;
            if(isTutorial && tutorialLevel == 5){
                ProceedTutorial(navigation);
            }
        }

        const AddNewCheckList =()=>{
            const modified = [...stateCheckedData.slice(0, index+1),{_text: '', status: false}, ...stateCheckedData.slice(index+1,stateCheckedData.length)]
            setStateCheckedData(modified);
            currentCheckListIndex= index+1;
            changesCnt++;
        }
        return(
            <View flex={false} row zIndex={1} onLayout={(event) => {
                if(stateCheckedData[index].height < event.nativeEvent.layout.height - 10 || stateCheckedData[index].height == null){
                    stateCheckedData[index].height = event.nativeEvent.layout.height;
                }
              }} >
                  
                  { isTutorial && index == 0 && tutorialLevel == 4  ? <TutorialFinger style={{zIndex: 1,top: height * 0.03, left: -width * 0.04}} tap /> : null}
                  { isTutorial && index == 0 && tutorialLevel == 5 ? <TutorialFinger style={{zIndex: 1,top: height * 0.02, left: width * 0.05}} tap /> : null}
                  { isTutorial && index == 1 && tutorialLevel == 7 ? <TutorialFinger style={{zIndex: 1,top: height * 0.02, right: height * 0.03}} tap /> : null}
                <CheckBox  checked={checkedIndivid} checkedColor='white' uncheckedColor='white' containerStyle={{width: 30,marginLeft: -10,height: 0}} onPress={changeCheckedState}/>
                <Input style={{width: '70%',marginTop: 3, flex: 0}} autoFocus={currentCheckListIndex == index ? true : false} 
                    onSubmitEditing={AddNewCheckList}
                    onKeyPress={({ nativeEvent }) => {
                        if (nativeEvent.key === 'Backspace' && text == '') {
                            const toRemove = [stateCheckedData[index]];
                            changesCnt = item.id == undefined ? changesCnt-1 : changesCnt+1;
                            const modified = stateCheckedData.filter(value=> !toRemove.includes(value));   
                            setStateCheckedData(modified);
                            currentCheckListIndex= index-1;
                        }
                    }}
                    white
                    b1
                    value={text=='' ? '' : text}
                    scrollEnabled={false}
                    blurOnSubmit={true}
                    multiline={true}
                    textAlignVertical='top'
                    hintColor='white'
                    family='semi-bold'
                    selectionColor='white'
                    minHeight={stateCheckedData[index].height}
                    onChangeText={textChanged=> changeTextState(textChanged)}
                />
                <Text touchable white family='bold' size={20} left={10} 
                    press={()=>{
                        console.log(item.id);
                        const toRemove = [stateCheckedData[index]];
                        changesCnt = item.id == undefined ? changesCnt-1 : changesCnt+1;
                        const modified = stateCheckedData.filter(value=> !toRemove.includes(value));   
                        setStateCheckedData(modified);
                        currentCheckListIndex= -1;
                        
                        if(isTutorial && tutorialLevel == 7){
                            ProceedTutorial(navigation);
                        }
                    }}
                >x</Text>
                
            </View>
        );
    }

    return(
        <View color={noteColor}>
            
            <View flex={false} row paddingBottom={10}>
                            <TouchableOpacity style={{flex: 0, marginTop: 25, marginLeft: 10, zIndex: 1}} onPress={checkData}>
                                
                                <Pic 
                                    src={require('../assets/images/back.png')}
                                    size={[25,25]} 
                                    resizeMode='contain'
                                />
        
                                {isTutorial && tutorialLevel == 11? <TutorialFinger style={{zIndex: 1, top: height * 0.02}} tap />: null}
                            </TouchableOpacity>
        
                            <View flex={1}>
                                
                                <View 
                                style={{
                                    flex: 0, alignSelf: 'flex-end' ,
                                    flexDirection : 'row',
                                }}
                                >
                                    <View
                                        animated
                                        row
                                        style={{
                                            flex: 0, marginTop: 25, marginRight: 8,
                                            transform: [{
                                                translateX: colorWheel,
                                                
                                            }]
                                        }}
                                    >
                                        <TouchableOpacity style={{marginRight:-10}} onPress={
                                            ()=>{
                                                setIsNote(isNote? 0: 1);
                                                if(isTutorial && tutorialLevel == 2){
                                                    ProceedTutorial(navigation);
                                                }
                                            }
                                        }>
                                            
                                            <Pic 
                                                animated
                                                src={isNote ? require('../assets/icons/openbook.png') : require('../assets/icons/closebook.png')}
                                                size={[25,25]} 
                                                resizeMode='contain'
                                            
                                            />
                                            
                                         { isTutorial && tutorialLevel == 2 ? <TutorialFinger style={{zIndex: 1, left: -width * 0.03, top: height * 0.02}} tap /> : null}
                                        </TouchableOpacity>
                                        
                                        <CheckBox checkedColor='white' uncheckedColor='white' checked={checked?true:false} 
                                            onPress={()=>{
                                                setChecked(checked?0:1);
                                                if(isTutorial && tutorialLevel == 3){
                                                    ProceedTutorial(navigation);
                                                }
                                            }}
                                            size={30}
                                            containerStyle={{flex: 0, width: 40, height: 40, top: -17, marginRight: 2,}}
                                        />
                                        
                                        { isTutorial && tutorialLevel == 3 ? <TutorialFinger style={{zIndex: 1, left: width * 0.05, top: height * 0.02}} tap /> : null}
        
        
                                        <TouchableOpacity onPress={()=> {
                                            open ? colorClose() : colorOpen();
                                            open = open ? false : true;
                                            
                                            if(isTutorial && tutorialLevel == 8){
                                                ProceedTutorial(navigation);
                                            }
                                        }} >
                                            
                                            <Pic 
                                                animated
                                                src={require('../assets/icons/colorwheel.png')}
                                                size={[25,25]} 
                                                resizeMode='contain'
                                            
                                            />
                                            
                                         { isTutorial && tutorialLevel == 8 ? <TutorialFinger style={{zIndex: 1, left: -width * 0.03, top: height * 0.02}} tap /> : null}
                                        </TouchableOpacity>
                                    </View >
                                        <View animated style={{flex: 0, flexDirection: 'row', marginTop: 30,
                                            width:  colorWheel.interpolate({
                                                inputRange: [-100, 0],
                                                outputRange: [100,0],
                                                extrapolate: 'clamp'
                                            }), position: 'absolute',
                                            right: 0,
                                        }} > 
                                            <List
                                                horizontal
                                                showsHorizontalScrollIndicator={false}
                                                data={theme.colors.wheel}
                                                renderItem={({item, index}) => 
                                                <TouchableOpacity style={{flex: 0}} onPress={()=> {
                                                        setNoteColor(item);
                                                        if(isTutorial && tutorialLevel == 10){
                                                            ProceedTutorial(navigation);
                                                        }

                                                    }}>
                                                    <Circle color={item} size={15} marginRight={5}
                                                    style={{borderColor: 'white',borderWidth: 1}}
                                                    /> 
                                                </TouchableOpacity>
                                                }
                                                keyExtractor={(item,index)=> index.toString()}
                                                onScroll={
                                                    isTutorial ? 
                                                    ({event})=>{
                                                        if(isTutorial && tutorialLevel == 9 && swipeTut ){
                                                            swipeTut = false;
                                                            setTimeout(()=>{
                                                                ProceedTutorial(navigation);
                                                            }, TutDelayTime);
                                                        }
                                                    } : null
                                                } 
                                                
                                            />
                                            {isTutorial && tutorialLevel == 9? <TutorialFinger style={{zIndex: 1, left: width * 0.1, top: height * 0.02}} swipe />: null}
                                            {isTutorial && tutorialLevel == 10? <TutorialFinger style={{zIndex: 1, top: height * 0.02}} tap />: null}
                                        </View>
                                    
                                </View>
                                
                            </View>
        
        
                    </View>
               
            <ScrollView style={{flex: 0}}>
                <View animated flex={1} paddingX={[theme.sizes.padding+4]} minHeight={scrollViewAnimated}>
                                        
                    <Input
                        scrollEnabled={false}
                        h2
                        hint='Title'
                        white
                        onFocus={()=> currentCheckListIndex = -1}
                        hintColor='white'
                        width='95%'
                        multiline
                        family='semi-bold'
                        selectionColor='white'
                        onChangeText={enteredText => setTitle(enteredText)}
                        value={title}
                    
                    />
                    { isTutorial && tutorialLevel == 0 ? <TutorialFinger style={{zIndex: 1,top: height * .03}} tap /> : null}
                    { isTutorial && tutorialLevel == 1 ? <TutorialFinger style={{zIndex: 1,top: height * .09}} tap /> : null}
                    
                    {
                        isNote ? <Input 
                        scrollEnabled={false}
                        onTouchStart={()=>{scrollViewAnimated.setValue(height - (height * 0.6))}}
                        onFocus={()=> currentCheckListIndex = -1}
                        b1 
                        pointerEvents='none'
                        white
                        multiline
                        textAlignVertical='top'
                        flex={1}
                        hint='Note'
                        hintColor='white'
                        marginTop={5}
                        marginBottom={10}
                        width='95%'
                        onChangeText={enteredText => setNote(enteredText)}
                        value={note}
                        
                    />: null
                    }

                    {
                        checked ? 
                        <View flex={50} > 
                            {stateCheckedData.map((item, index) => (
                                <CheckedList key={index.toString()} item={item} index={index} />
                            )
                            )}
                            <View touchable flex={false} row press={()=>{
                                 const modified = [...stateCheckedData,{_text: '', status: false}]
                                 setStateCheckedData(modified);    
                                 currentCheckListIndex = stateCheckedData.length;
                                 changesCnt++;
                                 if(isTutorial && tutorialLevel == 6){
                                    ProceedTutorial(navigation);
                                }
                            }}>
                                <Text white size={30} left={-5} top={-5}> + </Text>
                                <Text size={20} white top={3} left={-5}> List</Text>
                                
                  { isTutorial && tutorialLevel == 6? <TutorialFinger style={{zIndex: 1,top: height * 0.03, left: width * 0.04}} tap /> : null}
                            </View>
                        </View>
                        : null
                    }


                </View>
            </ScrollView>
            <View flex={false} paddingBottom={15} paddingTop={15} paddingRight={15}>
                
            <Text white end size={13} family='semi-bold' 
            >{currentNote.date}</Text>

            </View>
        </View>
    );
}

export default NoteEditor;