import React from 'react';
import { Alert } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('chevy');

const note_tbl = 'note_table';
const check_tbl = 'check_table';

const CheckNote =()=>{
    db.transaction(
        tx => {
            tx.executeSql(
                `create table if not exists ${note_tbl} `+
                `(id integer primary key not null, title text, date text, color text, note text, isNote integer, isCheckList integer)`
            );
        }
    );
    db.transaction(
        tx => {
            tx.executeSql(
                `create table if not exists ${check_tbl} `+
                `(id integer primary key not null, parent_id integer , _text text, status integer)`
            );
        }
    );
}

const AddNote = (pugi) =>{
    const { title, date, color, note, isNote, isCheckList, checkList,} = pugi;
    let query = "INSERT INTO "+note_tbl+" (id,title, date, color, note, isNote, isCheckList) VALUES (null,?,?,?,?,?,?)";
    let params = [title, date, color, note, isNote, isCheckList];

    db.transaction(
        (tx)=> {
          tx.executeSql(query, params,(tx, results) =>{
            
            for(let i = 0; i < checkList.length; i++){

            AddCheckList(results.insertId, checkList[i]);
            }
            console.log('Success Note!');
            
          }, function(tx,err) {
            Alert.alert(err.message);
            return;
          })
        }
    );

}

const AddCheckList = (parent_id, checkList) => {
    const { _text, status } = checkList;
    let query = "INSERT INTO "+check_tbl+" (id,parent_id, _text, status) VALUES (null,?,?,?)";
        let params = [parent_id, _text, status];

        db.transaction(
            (tx)=> {
            tx.executeSql(query, params,(tx, results) =>{
                console.log('Success CheckList!');
            }, function(tx,err) {
                Alert.alert(err.message);
                return;
            })
            }
    )

}

const SelectNote =(SetData)=>{
    let query = "SELECT * from " + note_tbl;
    let params = [];
    db.transaction(
      (tx)=> {
        tx.executeSql(query, params,(tx, results) =>{
          if(results.rows._array.length > 0){
            console.log(results.rows._array);
            for(let i = 0; i < results.rows._array.length; i++){
              SelectCheckList(results.rows._array[i], SetData);
            }
           //console.log(...results.rows._array);
          }
         // console.log('Success'); 
        }, function(tx,err) {
          Alert.alert(err.message);
          return;
        })
      }
    );
}

const SelectCheckList =(array, SetData)=>{
  let query = "SELECT * from " + check_tbl + " WHERE parent_id = " + array.id;
  let params = [];
  db.transaction(
    (tx)=> {
      tx.executeSql(query, params,(tx, results) =>{
        if(results.rows._array.length > 0){
          
          let modified = {
            title: array.title, 
            date: array.date,
            color: array.color,
            note: array.note,
            isNote: !array.isNote ? false : true,
            isCheckList: !array.isCheckList ? false : true,
            checkList: results.rows._array,
          }
          SetData(items=> [...items, modified]);
          console.log(modified);
        }
      }, function(tx,err) {
        Alert.alert(err.message);
        return;
      })
    }
  );
}


const DeleteAll =()=>{
    let query = "DELETE from " + check_tbl;
    let params = [];
    db.transaction(
      (tx)=> {
        tx.executeSql(query, params,(tx, results) =>{
          console.log(results);
          Alert.alert('Success');
        }, function(tx,err) {
          Alert.alert(err.message);
          return;
        })
      }
    );

}

const DropTable =()=>{
    let query = "DROP TABLE " + check_tbl;
    let params = [];
    db.transaction(
      (tx)=> {
        tx.executeSql(query, params,(tx, results) =>{
          console.log(results);
          Alert.alert('Success');
        }, function(tx,err) {
          Alert.alert(err.message);
          return;
        })
      }
    );
}


export {
    CheckNote,
    AddNote,
    SelectNote,
    DeleteAll,
    DropTable

}