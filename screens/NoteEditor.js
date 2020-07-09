import React,{useState, useRef, useEffect} from 'react';
import { View, Input, Text, Pic, Circle, List } from '../components';
import { theme } from '../constants';
import {TouchableOpacity,ScrollView, Dimensions, Animated, Easing, Keyboard} from 'react-native';
import { CheckBox } from 'react-native-elements';
import { AddNote, SelectNote, DeleteAll, DropTable } from '../database/database'

const { height } = Dimensions.get('screen');


function CheckedList(props){
    const { item, index,checkedData } = props;
    const { state, setState } = checkedData;
    const [text, setText] = useState(item._text);
    const [checked, setChecked] = useState(item.status? true : false);
    
    const changeCheckedState =()=>{
        setChecked(checked?false : true);
        setTimeout(() => {
            let updateData = state;
            updateData[index].status = state[index].status ? 0 : 1;
            setState(items=> [...updateData]);
        }, 1);
    }

    const changeTextState =textChanged=>{
        setText(textChanged);
        setTimeout(() => {
            let updateData = state;
            updateData[index]._text = textChanged;
            setState(items=> [...updateData]);
        }, 1);
    }
    
    return(
        <View flex={false} row height={30}>
            <CheckBox checked={checked} checkedColor='white' uncheckedColor='white' containerStyle={{width: 30,marginLeft: -10,}} onPress={changeCheckedState}/>
            <Input style={{width: '100%'}} autoFocus={true} 
                onSubmitEditing={()=>{setState(
                    items => [...items,{_text: '', status: false }])
                }}
                white
                b1
                hintColor='white'
                family='semi-bold'
                selectionColor='white'
                value={text}
                onChangeText={textChanged=> changeTextState(textChanged)}
                
            />
        </View>
    );
}

function NoteEditor({navigation, route}){
    const { currentNote, index, type} = route.params;
    const checkList = currentNote.checkList != null ?  currentNote.checkList.map(a => ({...a})) : [{_text: ' ', status: false}];
    const [ title, setTitle] = useState(currentNote.title);
    const [ note, setNote] = useState(currentNote.note);
    const [noteColor, setNoteColor] = useState(currentNote.color);
    const [checked, setChecked] = useState(currentNote.isCheckList);
    const [stateCheckedData, setStateCheckedData] = useState(checkList);
    const [isNote, setIsNote] = useState(currentNote.isNote);
    const colorWheel = useRef(new Animated.Value(0)).current;
    const scrollViewAnimated = useRef(new Animated.Value(height - (height * 0.1))).current;
    let open = false;

    useEffect(()=>{
        
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
    
    navigation.setOptions({
        headerShown: false,
    });

    const checkData =()=>{
        const current = {
                id: currentNote.id, 
                title,
                note,
                color: noteColor,
                date: currentNote.date,
                checkList: stateCheckedData,
                isCheckList: checked,
                isNote,
        }
        navigation.navigate('Ingridients',{post:
            current,
            index,
            type,
        });
        
    }

    return(
        <View color={noteColor}>
            <View flex={false} row paddingBottom={10}>
                            
                            <TouchableOpacity style={{flex: 0, marginTop: 25, marginLeft: 10}} onPress={checkData}>
                                
                                <Pic 
                                    src={require('../assets/images/back.png')}
                                    size={[25,25]} 
                                    resizeMode='contain'
                                />
        
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
                                            ()=>{setIsNote(isNote? false: true);}
                                        }>
                                            
                                            <Pic 
                                                animated
                                                src={isNote ? require('../assets/icons/openbook.png') : require('../assets/icons/closebook.png')}
                                                size={[25,25]} 
                                                resizeMode='contain'
                                            
                                            />
                                        </TouchableOpacity>
                                        
                                        <CheckBox checkedColor='white' uncheckedColor='white' checked={checked?true:false} 
                                            onPress={()=>setChecked(checked?false:true)}
                                            size={30}
                                            containerStyle={{flex: 0, width: 40, height: 40, top: -17, marginRight: 2,}}
                                        />
        
        
                                        <TouchableOpacity onPress={()=> {
                                            console.log('pogs',open);
                                            open ? colorClose() : colorOpen();
                                            open = open ? false : true;
                                        }} >
                                            
                                            <Pic 
                                                animated
                                                src={require('../assets/icons/colorwheel.png')}
                                                size={[25,25]} 
                                                resizeMode='contain'
                                            
                                            />
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
                                        data={[ 
                                            {color: '#64D671' },
                                            {color: '#5682FF' },
                                            {color: '#FFA2A2' },
                                            {color: '#FF84DF' },
                                            {color: '#8685FF' },
                                            {color: 'yellow' },
                                        ]}
                                        renderItem={({item}) => 
                                        <TouchableOpacity style={{flex: 0}} onPress={()=> setNoteColor(item.color)}>
                                            <Circle color={item.color} size={15} marginRight={5}
                                            style={{borderColor: 'white',borderWidth: 1}}
                                            /> 
                                        </TouchableOpacity>
                                        }
                                        keyExtractor={item=> item.color}
                                    />
        
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
                        multiline
                        hintColor='white'
                        family='semi-bold'
                        selectionColor='white'
                        onChangeText={enteredText => setTitle(enteredText)}
                        value={title}
                    
                    />

                    
                    {
                        isNote ? <Input 
                        scrollEnabled={false}
                        onTouchStart={()=>scrollViewAnimated.setValue(height - (height * 0.6))}
                        b1 
                        pointerEvents='none'
                        white
                        multiline
                        textAlignVertical='top'
                        flex={1}
                        hint='Note'
                        hintColor='white'
                        marginTop={5}
                        onChangeText={enteredText => setNote(enteredText)}
                        value={note}
                        
                    />: null
                    }

                    {
                        checked ? 
                        <View flex={50}> 
                            {stateCheckedData.map((item, index) => (
                                <CheckedList key={index.toString()} item={item} index={index} checkedData={{state: stateCheckedData, setState: setStateCheckedData}}/>
                            )
                            )}
                        </View>
                        : null
                    }

                </View>
            </ScrollView>
        </View>
    );
}

export default NoteEditor;