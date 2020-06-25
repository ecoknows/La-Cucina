import React,{useState, useEffect} from 'react';
import { View, List,Text, Card } from '../components';
import { ScrollView } from 'react-native-gesture-handler';
import { theme } from '../constants';
import { CheckBox } from 'react-native-elements';
import { AddNote, DeleteAll, DropTable, GetDataPos, InitialData, DataPos, RemovePos, SeeData, PagingSelect } from '../database/database'

const data1 = [
   /* {
        title:'Today\'s Ingrideints', 
        date: '14 April',
        color: '#5682FF',
        note: '1. 3pcs Onion\n'+
              '2. 5pcs Chicken\n'+
              '3. 1pcs of Pepper',
        isNote: true,
        isCheckList: false,
        checkList: [{_text: '', status: 0 }],
    },
    {
        title:'Grocery List', 
        date: '20 Sept',
        color: '#FFA2A2',
        note: 'By the end of the day I must go buy sum of the important ingridients',
        isNote: true,
        isCheckList: false,
        checkList: [{_text: '', status: 0 }],
    },*/
]
const data2 = [
  /*  {
        title:'Shopping Items', 
        date: '20 Dec',
        color: '#FF84DF',
        note: '',
        isNote: true,
        isCheckList: true,
        checkList: [
            {
                _text: 'Pork',
                status: 0,
            },
            {
                _text: 'Mama Sita',
                status: 0,
            },
            {
                _text: 'Lola Remedios',
                status: 0,
            },
            {
                _text: 'Oister Sauce',
                status: 0,
            },
            {
                _text: 'Tocino',
                status: 0,
            },
        ]
    },
    {
        title:'Birthday Plan', 
        date: '14 April',
        color: '#8685FF',
        note: 'Luluto ng sphagettin tapos pansit sa mga kapitbahay',
        isNote: true,
        isCheckList: false,
        checkList: [{_text: '', status: 0 }],
    },*/
]


function Ingridients({navigation, route}){

    const [stateData1, setStateData1] = useState(data1.slice(0,5));
    const [stateData2, setStateData2] = useState(data2.slice(0,5));
    const [isFirstRow,setIsFirstRow] = useState(true);
    const monthsText = ['Jan','Feb','March','April','May','Jun','July','Aug','Sept','Oct','Nov','Dec'];
    const date =  new Date().getDate() +" " + monthsText[new Date().getMonth()];
    
  DeleteAll();
  //DropTable();
  //RemovePos();
  //SeeData();
 // PagingSelect();
    React.useEffect(() => {
       InitialData({setStateData1, setStateData2, setIsFirstRow, data1, data2  });
        if (route.params?.post) {
            const {index, post, type} = route.params; 

            if(index == -1){
                const data = isFirstRow ? data1 : data2;  
                const stateData = isFirstRow ? stateData1 : stateData2;
                const setData = isFirstRow ? setStateData1 : setStateData2;

                if(data.length == stateData.length){
                    data.unshift(post);
                    setData(items=>[post,...items])
                }else{
                    data.unshift(post);
                }

                setIsFirstRow(isFirstRow ? false : true); 
                DataPos(isFirstRow);
                AddNote(post,isFirstRow);
            }else{
                let updateData = null;
                switch(type){
                    case 1: 
                        updateData = stateData1;
                        updateData[index] = post;
                        setStateData1( items=>[...updateData]);
                        break;
                    case 2: 
                        updateData = stateData2;
                        updateData[index] = post;
                        setStateData2( items=>[...updateData]);
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
        const { item, stateData, mainIndex } = props;
        const { data, setData } = stateData

        const changeChecked =(index)=>{

            setTimeout(()=>{
                let updatedData = data;
                updatedData[mainIndex].checkList[index].status = updatedData[mainIndex].checkList[index].status ? 0 : 1;
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

    return(
        <View white>


            <View flex={15} paddingTop={30} row>
                <ScrollView
                  onScroll={({nativeEvent}) => {
                    if (isCloseToBottom(nativeEvent)) {
                        let stateDataSize = stateData1.length;
                        let dataSize = data1.length;

                        if(dataSize > stateDataSize){
                            /*
                            let offset = (dataSize- stateDataSize) >= 5 ? stateDataSize + 5 : stateDataSize + dataSize- stateDataSize; 
                          
                            setStateData1(
                                item => [...item,...data1.slice(stateDataSize,offset)]
                            )*/
                        }
                        
                        _1_NextPage({setStateData1, data1});
                        _2_NextPage({setStateData2, data2});
                        stateDataSize = stateData2.length;
                        dataSize = data2.length;
                        
                        if(dataSize > stateDataSize){
                            /*let offset = (dataSize- stateDataSize) >= 5 ? stateDataSize + 5 : stateDataSize + dataSize- stateDataSize; 
    
                            setStateData2(
                                item => [...item,...data2.slice(stateDataSize,offset)]
                            )*/
                           
                        }

                    }
                  }}
                  scrollEventThrottle={400}
                >
                    
                <Card round={25} color='#64D671' padding={theme.sizes.padding} accent marginX={[20,20]} marginBottom={8}>
                    <Text size={18} white family='bold' bottom={theme.sizes.padding/2}>Plan to for make cupcake</Text>
                    <Text size={11} white family='semi-bold' >Gusto ko ng cupcake, yung cupcake na matamis tamis, tapos may juice na pampapawi ng umay, at syempre may toppings yung cupcake.</Text>
                    <Text size={12} white family='bold' >{null}</Text>
                    <Text size={12} white end top={20}>12 Feb</Text>
                </Card>

                    
                <View row flex={1}>

                        <View flex={1} >
                            {stateData1.map(
                                (item,index) => (
                                    <View flex={false} key={index.toString()} marginBottom={8} width='85%' end marginRight={8}  >
                
                                        <Card inTouchable round={25} color={item.color} padding={theme.sizes.padding} accent 
                                              inPress={()=>navigation.navigate('NoteEditor',{currentNote: item, index, type : 1}) }>
                                            <Text size={18} white family='bold' bottom={theme.sizes.padding/2}>{item.title}</Text>
                                           {item.isNote ?  <Text size={11} white family='semi-bold' bottom={10} numberOfLines={10} ellipsizeMode='tail'>{item.note}</Text> : null }
                                           { item.isCheckList ? <CheckList item={item} stateData={{data: stateData1,setData: setStateData1}} /> : null}
                                            <Text size={12} white end top={20}>{item.date}</Text>
                                        </Card>
                                    </View>
                                )
                            )}
    
                        </View>

                        <View flex={1} >
                            {stateData2.map(
                                (item,index) => (
                                  
                                <View flex={false} key={index.toString()} marginBottom={8} width='85%' >
                                    
                                    <Card inTouchable round={25} color={item.color} padding={theme.sizes.padding} accent
                                        inPress={()=>navigation.navigate('NoteEditor',{currentNote: item, index, type : 2}) }
                                    >
                                        <Text size={18} white family='bold' bottom={theme.sizes.padding/2}>{item.title}</Text>
                                        {item.isNote ? <Text size={11} white family='semi-bold' >{item.note}</Text> : null }
                                        { item.isCheckList ? <CheckList item={item} mainIndex={index} stateData={{data: stateData2, setData: setStateData2}}/> : null}
                                        <Text size={12} white end top={40}>{item.date}</Text>
                                    </Card>

                                </View>
                            )
                             )}

                        </View>
                        

                    
                </View>


                </ScrollView>

            </View>
            
            <View  center middle >
                <Card touchable round={50} accent size={[100]} center middle row
                    press={()=> navigation.navigate('NoteEditor',{currentNote: {title: '', note: '', date ,isNote: true,isCheckList: false , color: theme.colors.accent, checkList: [{_text: '', status: false}]}, index: -1}) }
                >
                    <Text family='semi-bold' size={18} white>Create</Text>
                </Card>
            </View>
        </View>
    );
}

export default Ingridients;