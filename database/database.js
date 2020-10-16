import React from 'react';
import { AsyncStorage } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { theme, tabs } from '../constants';

const db = SQLite.openDatabase('chevy');

const note_table = 'note_table';
const note_check_tbl = 'note_check_table';

const history_tbl = 'histroy_table';
const favorite_tbl = 'favorite_table';

const userId = 'Amber';
const first_data = 'Eco';
const TAG = 'DATABASE ';
const is_note_tbl_exist = 'exist_note_tbl';

let currentOffset = -1;

const PAGING_LIMIT = "4";

let isInitial = true;

let fetching_nextPage = true;


const SnapShotListiner = {
  history: true,
  favorite: true,
}


const DropTable =()=>{
    let query = "DROP TABLE " + note_table;
    let params = [];
    db.transaction(
      (tx)=> {
        tx.executeSql(query, params,(tx, results) =>{
          console.log(results);
          console.log('Success');
        }, function(tx,err) {
          console.log(err.message);
          return;
        })
      }
    );
}


const SeeData =()=>{
  //let query = "SELECT r.*, l._text from " + note_table + " r INNER JOIN " + note_check_tbl+ " l ON r.id = l.parent_id";
  //let query = "SELECT * FROM " + note_table + " WHERE id = 1 = ( SELECT * FROM "+note_check_tbl+" )"
  let query = "SELECT * FROM "+ history_tbl;
  let params = [];

  db.transaction(
    (tx)=> {
      tx.executeSql(query, params,(tx, results) =>{
        if(results.rows._array.length > 0){
          console.log(results.rows._array);
        }
      }, function(tx,err) {
        console.log(err.message);
        return;
      })
    }
  );

}


export {
    db,
    note_table,
    note_check_tbl,
    history_tbl,
    favorite_tbl,
    is_note_tbl_exist,
    first_data,
    userId,
    TAG,
    DropTable,
    SeeData,
    SnapShotListiner,
    PAGING_LIMIT,
}