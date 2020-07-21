import React, { useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
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

function ListView(props){
    const {item, index, size} = props;
    const index_plus = index+1;
    let item_state = (index_plus % 2) == 0 ? EVEN : ODD;
    item_state = (index_plus == 1) ? FIRST : item_state ;
    if(index_plus == size){
        if((index_plus % 2) == 0 ){
            item_state = LAST_EVEN;
        }else{
            
            item_state = LAST_ODD;
        }
    }

    const Even_Item = () => {
        return(
            <View flex={false} white size={['100%', 210]} center>
                <Text style={{position:'absolute', top: -18, right: 50}} end
                family='bold'
                accent
                size={24}
                >Maruya</Text>
                   
                   <View flex={false} center middle right={55}>

                        <View flex={false} style={[styles.diagonal_right, {transform:[{rotate: '-45deg'}]}]}/>
                        
                        <View flex={false} style={[styles.diagonal_left,{transform:[{rotate: '45deg'}], opacity: item_state == LAST_EVEN ? 0: 1}]}/>
                        
                   </View>
                   
                   
                   <Pic
                        right={20}
                        absolute
                        size={[170,170]}
                        src={require('../assets/images/test.png')} />
          
                   
             </View>
        )
    }

    const Odd_Item = () => {
        return(

                            
            <View flex={false} white size={['100%', 210]} center>
                    <Text style={{position:'absolute', top: -18, left: 40, width: 100}}
                    family='bold'
                    size={24}
                    accent
                    >Maruya</Text>

                   <View flex={false} center middle left={40} transform={[{rotate: '180deg'}]}>

                   <View flex={false} style={[styles.diagonal_right, {transform:[{rotate: '-45deg'}],opacity: item_state == LAST_ODD ? 0: 1}]} />
                        
                    <View flex={false} style={[styles.diagonal_left,{transform:[{rotate: '45deg'}],opacity: (item_state == FIRST || (item_state == LAST_ODD && index == 0))? 0: 1}]} />
                        
                        
                   </View>
                   
                   
                   <Pic
                        absolute
                        size={[170,170]}
                        src={require('../assets/images/test.png')} />

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

function History(){
    return(
       <View white>
            <List 
                    marginTop={50}
                    data={data_set}
                    renderItem={({item,index})=> <ListView item={item} index={index} size={data_set.length} /> }
                    keyExtractor={(item,index)=> index.toString()}
                    
                    contentContainerStyle={{paddingTop: 20,paddingBottom: 100}}
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