import React,{useState, useEffect, useRef} from 'react';
import { View, List,Text, Card } from '../components';
import { ScrollView } from 'react-native-gesture-handler';
import { theme } from '../constants';
import { CheckBox } from 'react-native-elements';
import { AddNote, DropTable,SeeData,NextDataSelect ,InitialData, DataPos, UpdateTable, QueryChanges, QueryChangesList, SelectCheckList, SetFirstNote, GetFirstNote, RemovePos } from '../database/database'
import { PanResponder, Animated } from 'react-native';

let _1_data = true;
let _2_data = true;
let _1_latest_offset_data = 0;
let _2_latest_offset_data = 0;
let _1_id_latest_data = 1;
let _2_id_latest_data = 1;

function Ingridients({navigation, route}){
    console.log('agaha');

    const [stateData1, setStateData1] = useState([]);
    const [stateData2, setStateData2] = useState([]);
    const [isFirstRow,setIsFirstRow] = useState(true);
    const [firstItem, setFirstItem] = useState(null);
    const monthsText = ['Jan','Feb','March','April','May','Jun','July','Aug','Sept','Oct','Nov','Dec'];
    const date =  new Date().getDate() +" " + monthsText[new Date().getMonth()];

    useEffect(()=> {
        if(stateData1.length != 0 && _1_data){
            
            for(let i = _1_latest_offset_data; i < stateData1.length; i++){
                SelectCheckList(stateData1[i],stateData1,setStateData1, i);
            }
            _1_latest_offset_data = stateData1.length;
            _1_id_latest_data = stateData1[0].id+1;
            _1_data = false;
        }
    },[stateData1]);
    
    useEffect(()=> {
        if(stateData2.length != 0 && _2_data){
            
            for(let i = _2_latest_offset_data; i < stateData2.length; i++){
                SelectCheckList(stateData2[i],stateData2,setStateData2, i);
            }
            
            _2_latest_offset_data = stateData2.length;
            _2_id_latest_data = stateData2[0].id+1;
            _2_data = false;
        }
    },[stateData2]);

  //DeleteAll();
  //DropTable();
  //SeeData();
  //RemovePos();
    useEffect(() => {
       GetFirstNote(setFirstItem);
       InitialData({setStateData1, setStateData2, setIsFirstRow, stateData1, stateData2 });
        if (route.params?.post) {
            const {index, post, type} = route.params; 

            if(index == -1){
                if(firstItem == null){
                    SetFirstNote(post);
                    setFirstItem([post]);
                }
                else{
                    const setData = isFirstRow ? setStateData1 : setStateData2;
                    if(isFirstRow){_1_id_latest_data++;} else { _2_id_latest_data++;}
                    setData(items=>[post,...items])
                    setIsFirstRow(isFirstRow ? false : true); 
                    DataPos(isFirstRow);
                    AddNote(post);
                }

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
                        console.log('eco = ',post)
                        updateData[index] = post;
                        setStateData1( items=>[...updateData]);
                        UpdateTable(QueryChanges({save, post}), post.id.toString(),1);
                        QueryChangesList({save, post},1);
                        break;
                    case 2: 
                        updateData = stateData2;
                        save = updateData[index];
                        console.log('eco = ',post)
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
        const paddingToBottom = 0;
        return layoutMeasurement.height + contentOffset.y >=
          contentSize.height - paddingToBottom;
    };

    const CheckList =props=>{
        const { item, stateData, mainIndex,isFirst } = props;
        const { data, setData } = stateData;

        const changeChecked =(index)=>{
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
                <View row>
                <CheckBox checked={checked} size={20} checkedColor='white' uncheckedColor='white'  containerStyle={{width: 30,height: 20, marginLeft: -10}} 
                    onPress={()=> { setChecked(checked ? false : true); changeChecked(index); }}
                    />
                <Text size={12} white family='bold' top={5} left={-3} >
                    {item._text}</Text> 
                </View>
            );  
        }

        if(item.checkList != null){
            return(
                item.checkList.map( (item, index) => <CheckItemView key={index.toString()} item={item} index={index}/> )      
            );
        }
        return null
    }

    const NoteListView =props=>{
    const {item, index, data, setData } = props;
    const swipe = useRef(new Animated.ValueXY()).current;

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
        }
      })).current;
        return(
            <View animated flex={false} marginBottom={8} width='85%' end marginRight={8} 
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
                    inPress={()=>navigation.navigate('NoteEditor',{currentNote: item, index, type : 1}) }>
                    <Text size={18} white family='bold' bottom={theme.sizes.padding/2}>{item.title}</Text>
                {item.isNote ?  <Text size={11} white family='semi-bold' bottom={10} numberOfLines={10} ellipsizeMode='tail'>{item.note}</Text> : null }
                { item.isCheckList ? <CheckList item={item}  mainIndex={index} stateData={{data,setData}} /> : null}
                    <Text size={12} white end top={20}>{item.date}</Text>
                </Card>
            </View>
        )
    }

    return(
        <View white>


            <View flex={15} paddingTop={30} row>
                <ScrollView
                  onScroll={({nativeEvent}) => {
                    if (isCloseToBottom(nativeEvent)) {
                        _1_data = true;
                        _2_data = true;
                        NextDataSelect(setStateData1,setStateData2);
                    }
                  }}
                  scrollEventThrottle={400}
                >

                {
                    firstItem != null ? 
                        
                    <Card inTouchable round={25} color={firstItem[0].color} padding={theme.sizes.padding} accent marginX={[20,20]} marginBottom={8}
                         inPress={()=>navigation.navigate('NoteEditor',{currentNote: firstItem[0], index: 0, type : 0}) }
                    >
                        <Text size={18} white family='bold' bottom={theme.sizes.padding/2}>{firstItem[0].title}</Text>
                        <Text size={11} white family='semi-bold' >{firstItem[0].note}</Text>
                        { firstItem[0].isCheckList ? <CheckList item={firstItem[0]}  mainIndex={0} stateData={{data: firstItem,setData: setFirstItem}} isFirst={true}/> : null}
                        <Text size={12} white family='bold' >{null}</Text>
                        <Text size={12} white end top={20}>12 Feb</Text>
                    </Card>
                    : 
                    null 
                }
                    
                <View row flex={1}>

                        <View flex={1} >
                            {stateData1.map(
                                (item,index) => <NoteListView key={index.toString()} item={item} index={index} data={stateData1} setData={setStateData1}/>
                            )}
    
                        </View>

                        <View flex={1} >
                            {stateData2.map(
                                (item,index) =>  <NoteListView key={index.toString()} item={item} index={index} data={stateData2} setData={setStateData2}/>
                             )}

                        </View>
                        

                    
                </View>


                </ScrollView>

            </View>
            
            <View  center middle >
                <Card touchable round={50} accent size={[100]} center middle row
                    press={()=> navigation.navigate('NoteEditor',{currentNote: {id: isFirstRow ? _1_id_latest_data : _2_id_latest_data,title: '', note: '', date ,isNote: true,isCheckList: false , color: theme.colors.accent, checkList: [{_text: '', status: false}]}, index: -1}) }
                >
                    <Text family='semi-bold' size={18} white>Create</Text>
                </Card>
            </View>
        </View>
    );
}

export default Ingridients;