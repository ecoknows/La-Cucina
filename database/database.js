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

let _1_currentOffset = -1;
let _2_currentOffset = -1;

const PAGING_LIMIT = "4";

let isInitial = true;

const InitialData =(dataState)=> {
  const {setStateData1, setStateData2, setIsFirstRow, stateData1, stateData2} = dataState;
  if(isInitial){
    GetDataPos(setIsFirstRow);
    _1_SelecData(setStateData1,stateData1);
    _2_SelecData(setStateData2);
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
                  console.log(err.message);
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
            console.log(err.message);
            return;
          })
        }
    );

}

const DeleteAll =()=>{
    let query = "DELETE from " + _2_data;
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

const DropTable =()=>{
    let query = "DROP TABLE " + note_tbl;
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

const _1_SelecData = (setStateData1, stateData1) =>{
  let query = "SELECT * from " + _1_data + " ORDER BY id DESC LIMIT 5";
  let params = [];

  db.transaction(
    (tx)=> {
      tx.executeSql(query, params,(tx, results) =>{
        if(results.rows._array.length > 0){
          setStateData1(items=> [...items, ...results.rows._array]);
          _1_currentOffset = results.rows._array[results.rows._array.length-1].id;
          for(let i = results.rows._array.length - 1; i != -1; i--){
            _1_SelectCheckList(results.rows._array[i],setStateData1,stateData1, i);
          }
        }
       // console.log('Success'); 
      }, function(tx,err) {
        console.log(err.message);
        return;
      })
    }
  );

}

const _2_SelecData = (setStateData2) =>{
  let query = "SELECT * from " + _2_data + " ORDER BY id DESC LIMIT 5";
  let params = [];


  db.transaction(
    (tx)=> {
      tx.executeSql(query, params,(tx, results) =>{
        if(results.rows._array.length > 0){
          //console.log(results.rows._array);
          _2_currentOffset = results.rows._array[results.rows._array.length-1].id;
          for(let i = results.rows._array.length - 1; i != -1; i--){
            _2_SelectCheckList(results.rows._array[i],setStateData2);
          }
         //console.log(...results.rows._array);
        }
       // console.log('Success'); 
      }, function(tx,err) {
        console.log(err.message);
        return;
      })
    }
  );

}

const _1_SelectCheckList =(array,setStateData1, stateData1,index)=>{
  let query = "SELECT * from " + _1_check_tbl + " WHERE parent_id = " + array.id;
  let params = [];

  db.transaction(
    (tx)=> {
      tx.executeSql(query, params,(tx, results) =>{
        if(results.rows._array.length > 0){
          
          let modified = {
            id: array.id,
            title: array.title, 
            date: array.date,
            color: array.color,
            note: array.note,
            isNote: !array.isNote ? false : true,
            isCheckList: !array.isCheckList ? false : true,
            checkList: [{_text :'co', status : 1}],
          }
          //console.log(stateData1);
          const data = stateData1;
          data[0] = modified
          setStateData1(data);
          //console.log(modified);
        }
      }, function(tx,err) {
        console.log(err.message);
        return;
      })
    }
  );


}
const _2_SelectCheckList =(array,setStateData2)=>{
  const query = "SELECT * from " + _2_check_tbl + " WHERE parent_id = " + array.id;
  const params = [];
  console.log('data ', array.id );

  db.transaction(
    (tx)=> {
      tx.executeSql(query, params,(tx, results) =>{
        if(results.rows._array.length > 0){
          
          let modified = {
            id: array.id,
            title: array.title, 
            date: array.date,
            color: array.color,
            note: array.note,
            isNote: !array.isNote ? false : true,
            isCheckList: !array.isCheckList ? false : true,
            checkList: results.rows._array,
          }
          setStateData2(items=> [modified,...items]);
          console.log(modified);
        }
      }, function(tx,err) {
        console.log(err.message);
        return;
      })
    }
  );


}




const SeeData =()=>{
  let query = "SELECT r.*, l._text from " + _1_data + " r INNER JOIN " + _1_check_tbl+ " l ON r.id = l.parent_id";
  //let query = "SELECT * FROM " + _1_data + " WHERE id = 1 = ( SELECT * FROM "+_1_check_tbl+" )"
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

const _2_NextPage =(setStateData2,stateData2)=>{
  let query = ' ';
  let params = [];
  console.log('current ', _2_currentOffset);
  query = _2_currentOffset == -1 ? "SELECT * from " + _2_data + " ORDER BY id DESC LIMIT " + PAGING_LIMIT  :
          "SELECT * from " + _2_data + " WHERE id < "+ _2_currentOffset.toString() +" ORDER BY id DESC LIMIT " + PAGING_LIMIT;

  db.transaction(
    (tx)=> {
      tx.executeSql(query, params,(tx, results) =>{
        if(results.rows._array.length > 0){
          //console.log(results.rows._array);
          setStateData2(items=> [...items,...results.rows._array]);
          _2_currentOffset = results.rows._array[results.rows._array.length-1].id;
          for(let i = 0; i < results.rows._array.length; i++){
            _2_NextPageCheckList(results.rows._array[i],setStateData2,stateData2);
          }
        }
      }, function(tx,err) {
        console.log(err.message);
        return;
      })
    }
  );

}

const _1_NextPage =(setStateData1, stateData1)=>{
  let query = ' ';
  let params = [];
  console.log('current ', _1_currentOffset);
  query = _1_currentOffset == -1 ? "SELECT * from " + _1_data + " ORDER BY id DESC LIMIT " + PAGING_LIMIT  :
          "SELECT * from " + _1_data + " WHERE id < "+ _1_currentOffset.toString() +" ORDER BY id DESC LIMIT " + PAGING_LIMIT;

  db.transaction(
    (tx)=> {
      tx.executeSql(query, params,(tx, results) =>{
        if(results.rows._array.length > 0){
         // console.log(results.rows._array);
          setStateData1(items=> [...items,...results.rows._array]);
          _1_currentOffset = results.rows._array[results.rows._array.length-1].id;
          for(let i = 0; i < results.rows._array.length; i++){
            _1_NextPageCheckList(results.rows._array[i],setStateData1,stateData1);
          }
        }
      }, function(tx,err) {
        console.log(err.message);
        return;
      })
    }
  );

}


const _1_NextPageCheckList =(array,setStateData1,stateData1)=>{
  let query = "SELECT * from " + _1_check_tbl + " WHERE parent_id = " + array.id;
  let params = [];

  db.transaction(
    (tx)=> {
      tx.executeSql(query, params,(tx, results) =>{
        if(results.rows._array.length > 0){
          
          let modified = {
            id: array.id,
            title: array.title, 
            date: array.date,
            color: array.color,
            note: array.note,
            isNote: !array.isNote ? false : true,
            isCheckList: !array.isCheckList ? false : true,
            checkList: results.rows._array,
          }
          stateData1[stateData1.length].checkList = [...stateData1[stateData1.length].checkList,modified];
          console.log(modified);
        }
      }, function(tx,err) {
        console.log(err.message);
        return;
      })
    }
  );


}


const _2_NextPageCheckList =(array,setStateData2)=>{
  let query = "SELECT * from " + _2_check_tbl + " WHERE parent_id = " + array.id;
  let params = [];

  db.transaction(
    (tx)=> {
      tx.executeSql(query, params,(tx, results) =>{
        if(results.rows._array.length > 0){
          
          let modified = {
            id: array.id,
            title: array.title, 
            date: array.date,
            color: array.color,
            note: array.note,
            isNote: !array.isNote ? false : true,
            isCheckList: !array.isCheckList ? false : true,
            checkList: results.rows._array,
          }
          
          stateData2[stateData2.length].checkList = [...stateData2[stateData2.length].checkList,results.rows._array];
          console.log(modified);
        }
      }, function(tx,err) {
        console.log(err.message);
        return;
      })
    }
  );


}

const UpdateTable =(change, id, table_id )=>{

  if(change != ' '){
    let table = null;
    switch(table_id){
      case 1: 
            table = _1_data;
            break;
      case 2: 
            table = _2_data;
            break;
      case 3: 
          table = _1_check_tbl;
          break;
      case 4: 
          table = _2_check_tbl;
          break;
    }
    let query = "UPDATE "+ table +" SET" + change + " WHERE id = " + id;
    console.log(query);
    let params = [];
  
    db.transaction(
      (tx)=> {
        tx.executeSql(query, params,(tx, results) =>{
          console.log("Success");
        }, function(tx,err) {
          console.log(err.message);
          return;
        })
      }
    );
  }
}

const QueryChanges =(data)=>{
  const { save, post } = data;
  let addQuery = ' ';
  addQuery = save.title != post.title ? addQuery + "title = '" + post.title +"', " : addQuery;
  addQuery = save.note != post.note ? addQuery + "note = '" + post.note +"', " : addQuery;
  addQuery = save.color != post.color ? addQuery + "color = '" + post.color +"', " : addQuery ;
  addQuery = save.date != post.date ? addQuery + "date = '" + post.date +"', " : addQuery ;
  addQuery = (save.isCheckList != post.isCheckList) ? addQuery + "isCheckList = " + (post.checkList ?  '1': '0') +", " : addQuery ;
  addQuery = (save.isNote != post.isNote) ? addQuery + "isNote = " + (post.isNote ? "1" : "0") +", " : addQuery ;
  
  return addQuery == ' ' ? ' ' : addQuery.slice(0, -2);
}


const QueryChangesList =(data,table_id)=>{
  const { save, post } = data;
  let addQuery = ' ';
  let saveCheckList = save.checkList;
  let postCheckList = post.checkList;
  for(let i = 0; i < saveCheckList.length; i++){

    addQuery = (saveCheckList[i]._text != postCheckList[i]._text )? addQuery + "_text = '" + postCheckList[i]._text +"', " : addQuery;
    addQuery = (saveCheckList[i].status != postCheckList[i].status) ? addQuery + "status = " + postCheckList[i].status.toString() +", " : addQuery;
 
    if(addQuery != ' '){
      let query = "UPDATE "+ (table_id == 1 ? _1_check_tbl : _2_check_tbl) +" SET" + addQuery.slice(0,-2) + " WHERE id = " + postCheckList[i].id.toString();
      let params = [];
      console.log('ecce ',query);
    
      
      db.transaction(
        (tx)=> {
          tx.executeSql(query, params,(tx, results) =>{
            console.log("Success");
          }, function(tx,err) {
            console.log(err.message);
            return;
          })
        }
      );
  
    }

  }

  if(postCheckList.length > saveCheckList.length ){
    let i = saveCheckList.length;
    for( ; i < postCheckList.length; i++){
      let query = "INSERT INTO "+ (table_id == 1 ? _1_check_tbl : _2_check_tbl) +" (id,parent_id, _text, status) VALUES (null,?,?,?)";
      let params = [post.id, postCheckList[i]._text, postCheckList[i].status];

      db.transaction(
          (tx)=> {
          tx.executeSql(query, params,(tx, results) =>{
              console.log('Success CheckList!');
          }, function(tx,err) {
              console.log(err.message);
              return;
          })
          }
      )

    }
  }

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
    _1_NextPage,
    _2_NextPage,
    _1_SelectCheckList,
    UpdateTable,
    QueryChanges,
    QueryChangesList,
}