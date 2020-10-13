
import { AsyncStorage } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { AddInitialNotes } from './ingridients';
import { SetFirstNote } from './async_storage';
import {
    db,
    note_table,
    note_check_tbl,
    history_tbl,
    favorite_tbl,
    is_note_tbl_exist,
    TAG,
} from './database';
import { theme } from '../constants';

// FUNCTION TO BE EXPORT // ***************************************************
const CheckData =()=>{
    note();
    history();
    favorite();
}

// FUNCTION TO BE NOT EXPORT // ***************************************************
function note(){
    let isCheckNoteTableDone = false;
    let query = `create table if not exists ${note_table} `+
    `(id integer primary key not null, title text, date text, color text, note text, isNote integer, isCheckList integer)`;
    let query_check_table =  `create table if not exists ${note_check_tbl} `+
    `(id integer primary key not null, parent_id integer , _text text, status integer)`;
    transaction(query,[],
        (tx, results) =>{
            if(isCheckNoteTableDone)
                is_table_note_exist();
            else 
              isCheckNoteTableDone = true;
        }
    );

    transaction(query_check_table, [], 
        (tx, results) =>{
            if(isCheckNoteTableDone)
                 is_table_note_exist();
            else 
              isCheckNoteTableDone = true;
          }
    )

}

function history(){
    let query =  `create table if not exists ${history_tbl} `+
    `(id integer primary key not null, parent_id integer, favorite integer, capacity integer, ingredients text, directions integer, date text, time_finished text, image integer, mocks_index integer, mocks_tabs integer)`;
    transaction(query);
}

function favorite(){
    let query = `create table if not exists ${favorite_tbl} `+
    `(id integer primary key not null, recipe_id integer, tabsIndex integer, mocksIndex integer)`
    transaction(query);
}

const is_table_note_exist = async ()=>{
    try{
      result = await AsyncStorage.getItem(is_note_tbl_exist) || null ;
      if(result == null){
        SetFirstNote(theme.initial_note_data[0]);
        AddInitialNotes();
        try{
          await AsyncStorage.setItem(is_note_tbl_exist,'exist');
        }catch (error){
          console.log(TAG, error);
        }
      }
      
    }catch (error){
      console.log(TAG, error);
    }
}

// MAIN DATA TRANSACTION
function transaction(query,arr ,func){
    db.transaction(
        (tx) => {
        tx.executeSql(
            query, arr, func,  
            function(tx,err) {
                console.log(err.message);
                return;
            }
        );
        }
    )
}

export{
    CheckData
}