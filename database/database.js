import React from 'react';
import { AsyncStorage } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('chevy');

const note_table = 'note_table';
const note_check_tbl = 'note_check_table';

const history_tbl = 'histroy_table';

const userId = 'Amber';
const first_data = 'Eco';
const TAG = 'DATABASE ';

let currentOffset = -1;

const PAGING_LIMIT = "4";

let isInitial = true;

const InitialData =(dataState)=> {
  const {setStateData1, setStateData2, setIsFirstRow, id_latest} = dataState;
  if(isInitial){
    GetDataPos(setIsFirstRow);
    DataSelect(setStateData1, setStateData2,id_latest);
    isInitial = false;
  }
}

const DataPos = async pos => {
  try{
    await AsyncStorage.setItem(userId,pos.toString())
  }catch (error){
    console.log(TAG, error);
  }
}
const RemovePos = async () => {
  try{
    await AsyncStorage.removeItem(first_data)
    console.log('success');
  }catch (error){
    console.log(TAG, error);
  }
}

const GetDataPos = async (setDataPos) => {
  if(isInitial){  
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
}

const SetFirstNote = async data => {
  try{
    await AsyncStorage.setItem(first_data,JSON.stringify(data))
  }catch (error){
    console.log(TAG, error);
  }
}

const GetFirstNote = async (setFirstItem)=>{
  if(isInitial){
    try{
      result = await AsyncStorage.getItem(first_data) || null ;
      if(result != null)
        setFirstItem([JSON.parse(result)]);
    }catch (error){
      console.log(TAG, error);
    }
  }
}

const CheckNote =()=>{
    db.transaction(
        tx => {
            tx.executeSql(
                `create table if not exists ${note_table} `+
                `(id integer primary key not null, title text, date text, color text, note text, isNote integer, isCheckList integer)`
            );
        }
    );

    db.transaction(
        tx => {
            tx.executeSql(
                `create table if not exists ${note_check_tbl} `+
                `(id integer primary key not null, parent_id integer , _text text, status integer)`
            );
        }
    );
    db.transaction(
      tx => {
          tx.executeSql(
              `create table if not exists ${history_tbl} `+
              `(id integer primary key not null, parent_id text, favorite integer, capacity integer, ingredients text, directions integer)`
          );
      }
    );
}

const AddHistory =(data,isDataFetch, isCapacityChange, isDirectionChange)=>{
  const {parent_id,favorite,capacity,ingredients, directions} = data;
  let query = null;
  let params = null;
  let ingredientsMod = (ingredients=='') ? ' ' : ingredients;
  if(!isDataFetch.value){   
    query = "INSERT INTO "+ history_tbl +" (id,parent_id, favorite, capacity, ingredients, directions) VALUES (null,?,?,?,?,?)";
    params = [parent_id,favorite,capacity,ingredientsMod, directions];
  }
  else{
    let setUpdate = '';
    setUpdate = !isCapacityChange ? (setUpdate+" capacity = "+capacity.toString()+",") : setUpdate;
    setUpdate = ingredients != '' ? (setUpdate+" ingredients = '"+ingredients +"',") : setUpdate + " ingredients = ' ',";
    setUpdate = !isDirectionChange ? (setUpdate+" directions = "+directions.toString()+",") : setUpdate;
    setUpdate = setUpdate != '' ? setUpdate.slice(0, -1) : setUpdate;
    query = "UPDATE "+ history_tbl +" SET"+setUpdate+" WHERE parent_id = '" +parent_id+"'";
    console.log(query)
    params = [];
  }
  db.transaction(
    (tx)=> {
    tx.executeSql(query, params,(tx, results) =>{
        console.log('Success History!');
    }, function(tx,err) {
        console.log(err.message);
        return;
    })
    }
  )
}

const GetHistory =(id, current_step, setCapacity, ingredients,setIsCurrentStepState,isCurrentStepState,isDataFetch, original_directions,_ingredients_changer)=>{ 
  let query = "SELECT * from " + history_tbl + " WHERE parent_id = '" + id+"'";
  let params = [];

  db.transaction(
    (tx)=> {
      tx.executeSql(query, params,(tx, results) =>{
        if(results.rows._array.length > 0){
          current_step.value = results.rows._array[0].directions;
          original_directions.value = results.rows._array[0].directions;
          setCapacity(results.rows._array[0].capacity);
          if(results.rows._array[0].ingredients != ' '){
            console.log('asddaaaaadddd');
            
            let ing_arr = results.rows._array[0].ingredients.split(',').map(Number);
            
            _ingredients_changer.array = _ingredients_changer.array.filter(value => !ing_arr.includes(value));
            _ingredients_changer.array = [..._ingredients_changer.array,...ing_arr];
            for(let i = 0; i < ing_arr.length; i++){
              ingredients[ing_arr[i]].checked = true;
            }
            setIsCurrentStepState(-1);
            setIsCurrentStepState(isCurrentStepState);

          }
          isDataFetch.value = true;
        }
      }, function(tx,err) {
        console.log(err.message);
        return;
      })
    }
  );


}

const GetHistroyCapacity =(id, setCapacity, original_capacity)=>{
  let query = "SELECT * from " + history_tbl + " WHERE parent_id = '" + id+"'";
  let params = [];

  db.transaction(
    (tx)=> {
      tx.executeSql(query, params,(tx, results) =>{
        if(results.rows._array.length > 0){
          setCapacity(results.rows._array[0].capacity);
          original_capacity.value=results.rows._array[0].capacity;
        }
      }, function(tx,err) {
        console.log(err.message);
        return;
      })
    }
  );
}

const AddNote = (data) =>{
    const { title, date, color, note, isNote, isCheckList, checkList,} = data;

    let query = "INSERT INTO "+ note_table +" (id,title, date, color, note, isNote, isCheckList) VALUES (null,?,?,?,?,?,?)";
    let params = [title, date, color, note, isNote, isCheckList];


    const AddCheckList = (parent_id, checkList) => {
      const { _text, status } = checkList;
      let query = "INSERT INTO "+ note_check_tbl +" (id,parent_id, _text, status) VALUES (null,?,?,?)";
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

const DataSelect =(setStateData1, setStateData2, id_latest) => {
  let query = "SELECT * from " + note_table + " ORDER BY id DESC LIMIT 10";
  let params = [];

  db.transaction(
    (tx)=> {
      tx.executeSql(query, params,(tx, results) =>{
        if(results.rows._array.length > 0){
          let evenArray = results.rows._array.filter((a,i)=>i%2===0);
          let oddArray = results.rows._array.filter((a,i)=>i%2===1);
          id_latest.value = results.rows._array[0].id + 1;
          setStateData1(items=> [...items, ...oddArray]);
          setStateData2(items=> [...items, ...evenArray]);
          currentOffset = results.rows._array[results.rows._array.length-1].id;
          
        }
       // console.log('Success'); 
      }, function(tx,err) {
        console.log(err.message);
        return;
      })
    }
  );

}

const SelectCheckList =(array,stateData,setStateData,index)=>{
  let query = "SELECT * from " + note_check_tbl + " WHERE parent_id = " + array.id;
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
            checkList:results.rows._array,
          }
          const data = stateData;
          data[index] = modified;
          setStateData(state => [...data]);
        }
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


const NextDataSelect =(setStateData1,setStateData2) =>{
  let query = ' ';
  let params = [];
  query = currentOffset == -1 ? "SELECT * from " + note_table + " ORDER BY id DESC LIMIT " + PAGING_LIMIT  :
          "SELECT * from " + note_table + " WHERE id < "+ currentOffset.toString() +" ORDER BY id DESC LIMIT " + PAGING_LIMIT;

  db.transaction(
    (tx)=> {
      tx.executeSql(query, params,(tx, results) =>{
        if(results.rows._array.length > 0){
          let evenArray = results.rows._array.filter((a,i)=>i%2===0);
          let oddArray = results.rows._array.filter((a,i)=>i%2===1);
          setStateData1(items=> [...items, ...oddArray]);
          setStateData2(items=> [...items, ...evenArray]);

          currentOffset = results.rows._array[results.rows._array.length-1].id;
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
            table = note_table;
            break;
      case 2: 
          table = note_check_tbl;
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


const QueryChangesList =(data)=>{
  const { save, post } = data;
  let addQuery = ' ';
  let saveCheckList = save.checkList;
  let postCheckList = post.checkList;
  for(let i = 0; i < saveCheckList.length; i++){

    addQuery = (saveCheckList[i]._text != postCheckList[i]._text )? addQuery + "_text = '" + postCheckList[i]._text +"', " : addQuery;
    addQuery = (saveCheckList[i].status != postCheckList[i].status) ? addQuery + "status = " + postCheckList[i].status.toString() +", " : addQuery;
 
    if(addQuery != ' '){
      let query = "UPDATE "+ note_check_tbl +" SET" + addQuery.slice(0,-2) + " WHERE id = " + postCheckList[i].id.toString();
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
      let query = "INSERT INTO "+ note_check_tbl +" (id,parent_id, _text, status) VALUES (null,?,?,?)";
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
    DropTable,
    DataPos,
    InitialData,
    SeeData,
    SelectCheckList,
    UpdateTable,
    QueryChanges,
    QueryChangesList,
    SetFirstNote,
    GetFirstNote,
    RemovePos,
    AddHistory,
    GetHistory,
    GetHistroyCapacity,
    NextDataSelect,
}