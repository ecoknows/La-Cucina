import { AsyncStorage } from 'react-native';
import {
    first_data,
    userId,
    TAG
} from './database';

const SetFirstNote = async data => {
    try{
      await AsyncStorage.setItem(first_data,JSON.stringify(data))
    }catch (error){
      console.log(TAG, error);
    }
}
  

const GetFirstNote = async (setFirstItem)=>{
    try{
      result = await AsyncStorage.getItem(first_data) || null ;
      if(result != null)
        setFirstItem([JSON.parse(result)]);
    }catch (error){
      console.log(TAG, error);
    }
}

const GetRowNoteStatus = async (setDataPos) => {
    try{
      result = await AsyncStorage.getItem(userId) || 'none';
      if(result != 'none'){
        setDataPos(result == '1' ? true :  false);
      }else{
        SetRowNoteStatus(1);
        setDataPos(true);
      }
    }catch (error){
      console.log(TAG, error);
    }
    isFirstNote = false
}

const SetRowNoteStatus = async pos => {
  try{
    await AsyncStorage.setItem(userId,pos.toString());
  }catch (error){
    console.log(TAG, error);
  }
}

// VARIABLES // ***********************************
let isFirstNote = true;

export {
    SetFirstNote,
    GetFirstNote,
    GetRowNoteStatus,
    SetRowNoteStatus,
}