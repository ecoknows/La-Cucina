import React from 'react';
import { Alert, AsyncStorage } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('chevy');

const _1_data = 'note_table_1';
const _2_data = 'note_table_2';

const _1_check_tbl = 'check_table_1';
const _2_check_tbl = 'check_table_2';

const userId = 'Amber';
const TAG = 'DATABASE ';

let isInitial = true;

const InitialData =(dataState)=> {
  const {setStateData1, setStateData2, setIsFirstRow, data1, data2} = dataState;
  if(isInitial){
    GetDataPos(setIsFirstRow);
    _1_SelecData(setStateData1,data1);
    _2_SelecData(setStateData2,data2);
    isInitial = false;
  }
}

const DataPos = async pos => {
  try{
    await AsyncStorage.setItem(userId,pos.toString())
    console.log('success datapos');
  }catch (error){
    console.log(TAG, error);
  }
}
const RemovePos = async () => {
  try{
    await AsyncStorage.removeItem(userId)
    console.log('success');
  }catch (error){
    console.log(TAG, error);
  }
}

const GetDataPos = async (setDataPos) => {
  try{
    result = await AsyncStorage.getItem(userId) || 'none';
    console.log('success get data pos');
    if(result != 'none'){
      setDataPos(result == '1' ? true :  false);
    }else{
      DataPos(1);
      setDataPos(true);
    }
  }catch (error){
    console.log(TAG, error);
  }
}

const CheckNote =()=>{
    db.transaction(
        tx => {
            tx.executeSql(
                `create table if not exists ${_1_data} `+
                `(id integer primary key not null, title text, date text, color text, note text, isNote integer, isCheckList integer)`
            );
        }
    );
    db.transaction(
      tx => {
          tx.executeSql(
              `create table if not exists ${_2_data} `+
              `(id integer primary key not null, title text, date text, color text, note text, isNote integer, isCheckList integer)`
          );
      }
  );

    db.transaction(
        tx => {
            tx.executeSql(
                `create table if not exists ${_1_check_tbl} `+
                `(id integer primary key not null, parent_id integer , _text text, status integer)`
            );
        }
    );
    
    db.transaction(
      tx => {
          tx.executeSql(
              `create table if not exists ${_2_check_tbl} `+
              `(id integer primary key not null, parent_id integer , _text text, status integer)`
          );
      }
  );
}

const AddNote = (pugi, isFirstRow) =>{
    const { title, date, color, note, isNote, isCheckList, checkList,} = pugi;
    const table = isFirstRow ? _1_data: _2_data;
    const check_table = isFirstRow ? _1_check_tbl : _2_check_tbl;

    let query = "INSERT INTO "+ table +" (id,title, date, color, note, isNote, isCheckList) VALUES (null,?,?,?,?,?,?)";
    let params = [title, date, color, note, isNote, isCheckList];


    const AddCheckList = (parent_id, checkList) => {
      const { _text, status } = checkList;
      let query = "INSERT INTO "+ check_table +" (id,parent_id, _text, status) VALUES (null,?,?,?)";
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

const DeleteAll =()=>{
    let query = "DELETE from " + _2_check_tbl;
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
    let query = "DROP TABLE " + note_tbl;
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

const _1_SelecData = (setStateData1,data1) =>{
  let query = "SELECT * from " + _1_data + " ORDER BY id DESC";
  let params = [];

  db.transaction(
    (tx)=> {
      tx.executeSql(query, params,(tx, results) =>{
        if(results.rows._array.length > 0){
          //console.log(results.rows._array);
          for(let i = results.rows._array.length - 1; i != -1; i--){
            _1_SelectCheckList(results.rows._array[i],setStateData1,data1);
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

const _2_SelecData = (setStateData2,data2) =>{
  let query = "SELECT * from " + _2_data + " ORDER BY id DESC";
  let params = [];


  db.transaction(
    (tx)=> {
      tx.executeSql(query, params,(tx, results) =>{
        if(results.rows._array.length > 0){
          //console.log(results.rows._array);
          for(let i = results.rows._array.length - 1; i != -1; i--){
            _2_SelectCheckList(results.rows._array[i],setStateData2,data2);
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

const _1_SelectCheckList =(array,setStateData1,data1)=>{
  let query = "SELECT * from " + _1_check_tbl + " WHERE parent_id = " + array.id;
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
          data1.unshift(modified);
          setStateData1(items=> [modified,...items]);
          console.log(modified);
        }
      }, function(tx,err) {
        Alert.alert(err.message);
        return;
      })
    }
  );


}
const _2_SelectCheckList =(array,setStateData2,data2)=>{
  const query = "SELECT * from " + _2_check_tbl + " WHERE parent_id = " + array.id;
  const params = [];
  console.log('data ', array.id );

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
          data2.unshift(modified);
          setStateData2(items=> [modified,...items]);
          console.log(modified);
        }
      }, function(tx,err) {
        Alert.alert(err.message);
        return;
      })
    }
  );


}


const PagingSelect =()=>{
  let query = "SELECT * from " + _1_data + " ORDER BY id DESC";
  let params = [];


  db.transaction(
    (tx)=> {
      tx.executeSql(query, params,(tx, results) =>{
        if(results.rows._array.length > 0){
          console.log();
         
         //console.log(...results.rows._array);
        }
      }, function(tx,err) {
        Alert.alert(err.message);
        return;
      })
    }
  );
}




const SeeData =()=>{
  let query = "SELECT * from " + _2_check_tbl;
  let params = [];

  db.transaction(
    (tx)=> {
      tx.executeSql(query, params,(tx, results) =>{
        if(results.rows._array.length > 0){
          console.log(results.rows._array);
        }
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
    DeleteAll,
    DropTable,
    DataPos,
    GetDataPos,
    InitialData,
    RemovePos,
    SeeData,
    PagingSelect
}