import { AsyncStorage } from 'react-native';
import { AddInitialNotes } from './ingridients';
import {
    first_data,
    TAG
} from './database';

const SetFirstNote = async data => {
    try{
      await AsyncStorage.setItem(first_data,JSON.stringify(data))
    }catch (error){
      console.log(TAG, error);
    }
}
  
export {
    SetFirstNote,

}