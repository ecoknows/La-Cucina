import * as SQLite from 'expo-sqlite';
import { tabs } from '../constants';
import { RemoveAllNotes, AddInitialNotes } from './ingridients';
import { TAG, is_note_tbl_exist } from './database';
import { AsyncStorage } from 'react-native';


// FUNCTION TO BE EXPORT // ***************************************************
const IngridientReset =()=>{
    is_initial_ingridient_exist((result)=>{
        if(tabs.tutorial.current != null && result == 'exist'){
            RemoveAllNotes(AddInitialNotes);
        }
    })
}



// FUNCTION TO BE NOT EXPORT // **********************************************
const is_initial_ingridient_exist = async (func)=>{
    try{
      result = await AsyncStorage.getItem(is_note_tbl_exist) || false ;
      func(result);
    }catch (error){
      console.log(TAG, error);
    }
}
export{
    IngridientReset
}