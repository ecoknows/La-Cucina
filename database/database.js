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
    await AsyncStorage.setItem(userId,pos.toString());
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

const AddHistory =(data,isDataFetch, isCapacityChange, isDirectionChange, isNewDate, isNewTimeFinished, isImage, isIndex, isMocksTabs)=>{
  const {id,parent_id,favorite,capacity,ingredients, directions, newDate, time_finished, image, index, mocks_tabs} = data;
  let query = null;
  let params = null;
  let ingredientsMod = (ingredients=='') ? ' ' : ingredients;
  if(!isDataFetch.value){   
    query = "INSERT INTO "+ history_tbl +" (id,parent_id, favorite, capacity, ingredients, directions, date, time_finished, image, mocks_index, mocks_tabs) VALUES (null,?,?,?,?,?,?,?,?,?,?)";
    params = [parent_id,favorite,capacity,ingredientsMod,directions,newDate, time_finished,image, index, mocks_tabs];
  }
  else{
    let setUpdate = '';
    setUpdate = !isCapacityChange ? (setUpdate+" capacity = "+capacity.toString()+",") : setUpdate;
    setUpdate = ingredients != '' ? (setUpdate+" ingredients = '"+ingredients +"',") : setUpdate + " ingredients = ' ',";
    setUpdate = !isDirectionChange ? (setUpdate+" directions = "+directions.toString()+",") : setUpdate;
    setUpdate = !isNewDate ? (setUpdate+" date = '"+newDate+"',") : setUpdate;
    setUpdate = !isNewTimeFinished ? (setUpdate+" time_finished = '"+time_finished+"',") : setUpdate;
    setUpdate = !isImage ? (setUpdate+" image = "+image.toString()+",") : setUpdate;
    setUpdate = !isIndex ? (setUpdate+" mocks_index = "+index.toString()+",") : setUpdate;
    setUpdate = !isMocksTabs ? (setUpdate+" mocks_tabs = "+mocks_tabs.toString()+",") : setUpdate;
    setUpdate = setUpdate != '' ? setUpdate.slice(0, -1) : setUpdate;
    query = "UPDATE "+ history_tbl +" SET"+setUpdate+" WHERE id = "+id.toString();
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

const FetchHistory =(setData, data)=>{
  

  let query = "SELECT * from " + history_tbl + " ORDER BY date DESC";
  let params = [];

  
  db.transaction(
    (tx)=> {
      tx.executeSql(query, params,(tx, results) =>{
         if(SnapShotListiner.history){
          //if(data.length != 0)

          setData(results.rows._array.length == 0 ? [] : results.rows._array );
          SnapShotListiner.history = false;
        }
      }, function(tx,err) {
        console.log(err.message);
        return;
      })
    }
  );


}

const GetHistory =(arg)=>{ 
  const { 
    id, 
    current_step,
    setCapacity, 
    ingridients,
    setIsCurrentStepState,
    isCurrentStepState,
    isDataFetch,
    original_direction,
    original_ingridients,
    _ingredients_changer,
    ingridents_finish_counter,
    direction_finish_counter,
    last_save_date,
    last_time_finished,
    last_image,
    last_index,
    last_mocks_tabs,
    ExistHistory,
    histor_id
  } = arg;

  let query = "SELECT * from " + history_tbl + " WHERE parent_id = "+id.toString();
  let params = [];

  db.transaction(
    (tx)=> {
      tx.executeSql(query, params,(tx, results) =>{
        
        if(results.rows._array.length > 0){
          
          const latest = results.rows._array.length-1 ;
          //console.log(results.rows._array,'asd ', latest);
          if(results.rows._array[ latest ].time_finished != '100%'){
            histor_id.value = results.rows._array[ latest ].id;
            current_step.value = results.rows._array[ latest ].directions;
            original_direction.value = results.rows._array[ latest ].directions;
            direction_finish_counter.value = results.rows._array[ latest ].directions;
            last_save_date.value = results.rows._array[ latest ].date;
            last_time_finished.value = results.rows._array[ latest ].time_finished;
            last_image.value = results.rows._array[ latest ].image;
            last_index.value = results.rows._array[ latest ].mocks_index;
            last_mocks_tabs.value =results.rows._array[ latest ].mocks_tabs;
            setCapacity(results.rows._array[ latest ].capacity);
            if(results.rows._array[ latest ].ingredients != ' '){

              let ing_arr = results.rows._array[ latest ].ingredients.split(',').map(Number);
              console.log(ing_arr);
              ingridents_finish_counter.value = ing_arr.length;
              original_ingridients.value = ing_arr.length;
              _ingredients_changer.array = _ingredients_changer.array.filter(value => !ing_arr.includes(value));
              _ingredients_changer.array = [..._ingredients_changer.array,...ing_arr];
              for(let i =  latest ; i < ing_arr.length; i++){
                ingridients[ing_arr[i]].checked = true;
              }
              setIsCurrentStepState(-1);
              setIsCurrentStepState(isCurrentStepState);

            }
            //console.log(results.rows._array);
            isDataFetch.value = true;
            ExistHistory();
          }
        }
      }, function(tx,err) {
        console.log(err.message);
        return;
      })
    }
  );


}

const DeleteHistory =(id, setReset, reset)=>{
  
  let query = "DELETE from " + history_tbl + " WHERE id = " + id.toString();
  let params = []; 

  
  db.transaction(
    (tx)=> {
      tx.executeSql(query, params,(tx, results) =>{
        console.log('Success');
        setReset(!reset);
      }, function(tx,err) {
        console.log(err.message);
        return;
      })
    }
  );



}

const GetHistroyCapacity =(id, setCapacity, original_capacity)=>{
  let query = "SELECT * from " + history_tbl + " WHERE parent_id = " + id.toString();
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


const RemoveNote =(id)=>{
  let query = "DELETE from " + note_table + " WHERE id = " + id;
  let params = [];

  db.transaction(
    (tx)=> {
    tx.executeSql(query, params,(tx, results) =>{
      query = "DELETE from " + note_check_tbl + " WHERE parent_id = " + id;
      
      db.transaction(
        (tx)=> {
        tx.executeSql(query, params,(tx, results) =>{
            console.log('Success Removing From Database!');
        }, function(tx,err) {
            console.log(err.message);
            return;
        })
        }
      )
      
    }, function(tx,err) {
        console.log(err.message);
        return;
    })
    }
  )



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
          if(array.title == 'Availabe Ingridients')
            console.log(results.rows._array , ' < ggmomukhamo');
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
        }else{
          array.checkList = [{_text:'', status: false}];
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

/*
const FavoriteGet =(setData)=> {
  
  let query = "SELECT * from " + favorite_tbl;
  let params = [];

  db.transaction(
    (tx)=> {
      tx.executeSql(query, params,(tx, results) =>{
        if(results.rows._array.length > 0 && SnapShotListiner.favorite){
          for(let i = 0; i < results.rows._array.length; i++){
            setData(results.rows._array);
          }
          SnapShotListiner.favorite = false;
        }
      }, function(tx,err) {
        console.log(err.message);
        return;
      })
    }
  );
}*/


const FetchFavorite =(setData,category)=> {
  let query = null;
  
  switch(category){
      case 0:
        query = "SELECT * from " + favorite_tbl + " ORDER BY id desc" ;
        break;
      case 1: 
      query = "SELECT * from " + favorite_tbl;
        break;
  }
  
  if(category > 1)
    query = "SELECT * from " + favorite_tbl + " WHERE tabsIndex = " + (category-2).toString()+ " ORDER BY id desc";
  let params = [];

  db.transaction(
    (tx)=> {
      tx.executeSql(query, params,(tx, results) =>{
        if(results.rows._array.length > 0){
          for(let i = 0; i < results.rows._array.length; i++){
            setData(results.rows._array);
          }
        }else{
          setData([]);
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
    DataPos,
    InitialData,
    SeeData,
    SelectCheckList,
    UpdateTable,
    SetFirstNote,
    GetFirstNote,
    RemovePos,
    AddHistory,
    GetHistory,
    GetHistroyCapacity,
    RemoveNote,
    FetchHistory,
    SnapShotListiner,
    DeleteHistory,
    FetchFavorite,
    PAGING_LIMIT,
}