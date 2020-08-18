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

const IsTableExist = async ()=>{
    try{
      result = await AsyncStorage.getItem(is_note_tbl_exist) || null ;
      if(result == null){
        AddInitialNote()
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
const AddInitialNote =()=>{
  const array = theme.initial_note_data; 
  SetFirstNote(array[0]);
  for(let i = 1; i < array.length; i++){
    AddNote(array[i]);
  }
  
}


const CheckNote =()=>{
  let isCheckNoteTableDone = false;
    db.transaction(
        tx => {
            tx.executeSql(
                `create table if not exists ${note_table} `+
                `(id integer primary key not null, title text, date text, color text, note text, isNote integer, isCheckList integer)`
            , [], (tx, results) =>{
              if(isCheckNoteTableDone)
                IsTableExist();
              else 
                isCheckNoteTableDone = true;
          }, function(tx,err) {
              console.log(err.message);
              return;
          }
            );
        }
    );

    db.transaction(
        tx => {
            tx.executeSql(
                `create table if not exists ${note_check_tbl} `+
                `(id integer primary key not null, parent_id integer , _text text, status integer)`
              , [], (tx, results) =>{
                if(isCheckNoteTableDone)
                  IsTableExist();
                else 
                  isCheckNoteTableDone = true;
              }, function(tx,err) {
                  console.log(err.message);
                  return;
              }
            );
        }
    );
    db.transaction(
      tx => {
          tx.executeSql(
              `create table if not exists ${history_tbl} `+
              `(id integer primary key not null, parent_id text, favorite integer, capacity integer, ingredients text, directions integer, date text, time_finished text, image integer, mocks_index integer, mocks_tabs integer)`
          );
      }
    );
    
    db.transaction(
      tx => {
          tx.executeSql(
              `create table if not exists ${favorite_tbl} `+
              `(id integer primary key not null, tabsIndex integer, mocksIndex integer)`
          );
      }
    );
}

const AddHistory =(data,isDataFetch, isCapacityChange, isDirectionChange, isNewDate, isNewTimeFinished, isImage, isIndex, isMocksTabs)=>{
  const {parent_id,favorite,capacity,ingredients, directions, newDate, time_finished, image, index, mocks_tabs} = data;
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

const FetchHistory =(setData, isAnim, data)=>{
  

  let query = "SELECT * from " + history_tbl + " ORDER BY date DESC";
  let params = [];

  
  db.transaction(
    (tx)=> {
      tx.executeSql(query, params,(tx, results) =>{
        console.log(SnapShotListiner.history);
        if(SnapShotListiner.history){
          if(data.length != 0)
            isAnim.value = false;
            console.log('asddd');
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
    setRestart
  } = arg;

  let query = "SELECT * from " + history_tbl + " WHERE parent_id = '" + id+"'";
  let params = [];

  db.transaction(
    (tx)=> {
      tx.executeSql(query, params,(tx, results) =>{
        if(results.rows._array.length > 0){
          current_step.value = results.rows._array[0].directions;
          original_direction.value = results.rows._array[0].directions;
          direction_finish_counter.value = results.rows._array[0].directions;
          last_save_date.value = results.rows._array[0].date;
          last_time_finished.value = results.rows._array[0].time_finished;
          last_image.value = results.rows._array[0].image;
          last_index.value = results.rows._array[0].mocks_index;
          last_mocks_tabs.value =results.rows._array[0].mocks_tabs;
          setCapacity(results.rows._array[0].capacity);
          if(results.rows._array[0].ingredients != ' '){

            let ing_arr = results.rows._array[0].ingredients.split(',').map(Number);
            ingridents_finish_counter.value = ing_arr.length;
            original_ingridients.value = ing_arr.length;
            _ingredients_changer.array = _ingredients_changer.array.filter(value => !ing_arr.includes(value));
            _ingredients_changer.array = [..._ingredients_changer.array,...ing_arr];
            for(let i = 0; i < ing_arr.length; i++){
              ingridients[ing_arr[i]].checked = true;
            }
            setIsCurrentStepState(-1);
            setIsCurrentStepState(isCurrentStepState);

          }
          isDataFetch.value = true;
          setRestart(true);
        }
      }, function(tx,err) {
        console.log(err.message);
        return;
      })
    }
  );


}

const DeleteHistory =(id, setReset, reset)=>{
  
  let query = "DELETE from " + history_tbl + " WHERE parent_id = '" + id+"'";
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
                  checkList.id = results.insertId;
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
            let size = 0;
            if(checkList.length != 1 && checkList[0]._text != '' )
              size = checkList.length;
            
            for(let i = 0; i < size; i++){
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

let fetching_nextPage = true;
const NextDataSelect =(setStateData1,setStateData2, paging_limit) =>{
  let query = ' ';
  let params = [];
  if(fetching_nextPage){
      query = currentOffset == -1 ? "SELECT * from " + note_table + " ORDER BY id DESC LIMIT " + paging_limit  :
              "SELECT * from " + note_table + " WHERE id < "+ currentOffset.toString() +" ORDER BY id DESC LIMIT " + paging_limit;

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
            fetching_nextPage = true;
          }, function(tx,err) {
            console.log(err.message);
            return;
          })
        }
      );
    fetching_nextPage = false;
  }
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
  console.log('sadreax ' , save.isCheckList);
  console.log('sadreax_post ' , post.isCheckList);
  let addQuery = ' ';
  addQuery = save.title != post.title ? addQuery + "title = '" + post.title +"', " : addQuery;
  addQuery = save.note != post.note ? addQuery + "note = '" + post.note +"', " : addQuery;
  addQuery = save.color != post.color ? addQuery + "color = '" + post.color +"', " : addQuery ;
  addQuery = save.date != post.date ? addQuery + "date = '" + post.date +"', " : addQuery ;
  addQuery = (save.isCheckList != post.isCheckList) ? addQuery + "isCheckList = " + (post.isCheckList ?  '1': '0') +", " : addQuery ;
  addQuery = (save.isNote != post.isNote) ? addQuery + "isNote = " + (post.isNote ? "1" : "0") +", " : addQuery ;
  
  return addQuery == ' ' ? ' ' : addQuery.slice(0, -2);
}


const QueryChangesList =(data)=>{
  const { save, post } = data;
  let saveCheckList = save.checkList;
  let postCheckList = post.checkList;
  if(saveCheckList[0].id != null)
    for(let i = 0; i < saveCheckList.length; i++){
      if(postCheckList[i] == undefined){continue;}
      let addQuery = ' ';
      postCheckList[i].status = postCheckList[i].status ? 1 : 0; 
      addQuery = (saveCheckList[i]._text != postCheckList[i]._text )? addQuery + "_text = '" + postCheckList[i]._text +"', " : addQuery;
      addQuery = (saveCheckList[i].status != postCheckList[i].status) ? addQuery + "status = " + postCheckList[i].status.toString() +", " : addQuery;
     
      if(addQuery != ' '){
        let query = "UPDATE "+ note_check_tbl +" SET" + addQuery.slice(0,-2) + " WHERE id = " + saveCheckList[i].id.toString();
        console.log(query);
        let params = [];
        db.transaction(
          (tx)=> {
            tx.executeSql(query, params,(tx, results) =>{
              
              console.log("Success ");
            }, function(tx,err) {
              console.log(err.message);
              return;
            })
          }
        );
      }

    }

  if(postCheckList.length > saveCheckList.length ){
    
    let i = saveCheckList[0].id == null ? 0 : saveCheckList.length;
    for( ; i < postCheckList.length; i++){
      let query = "INSERT INTO "+ note_check_tbl +" (id,parent_id, _text, status) VALUES (null,?,?,?)";
      let params = [post.id, postCheckList[i]._text, postCheckList[i].status ? 1 : 0];

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
  if(postCheckList.length < saveCheckList.length ){
    let i = postCheckList.length;
    for( ; i < saveCheckList.length; i++){
      let query = "DELETE FROM "+ note_check_tbl +" WHERE id = " + saveCheckList[i].id.toString();
      let params = [];

      db.transaction(
          (tx)=> {
          tx.executeSql(query, params,(tx, results) =>{
              console.log('DELETE CheckList!');
          }, function(tx,err) {
              console.log(err.message);
              return;
          })
          }
      )

    }
  }

}

const FavoriteData= (data, isAdd) => {
  const { tabsIndex, mocksIndex } = data;
  if(isAdd){
    let query = "INSERT INTO "+ favorite_tbl +" (id,tabsIndex,mocksIndex) VALUES (null,?,?)";
    let params = [tabsIndex, mocksIndex];

    db.transaction(
        (tx)=> {
        tx.executeSql(query, params,(tx, results) =>{
            console.log('Success Favorite Add!');
        }, function(tx,err) {
            console.log(err.message);
            return;
        })
        }
    )
  }else{
    let query = "DELETE FROM "+ favorite_tbl +" WHERE tabsIndex = "+tabsIndex.toString()+" AND mocksIndex = "+mocksIndex.toString();
    let params = [];

    db.transaction(
        (tx)=> {
        tx.executeSql(query, params,(tx, results) =>{
            console.log('Success Favorite Delete!');
        }, function(tx,err) {
            console.log(err.message);
            return;
        })
        }
    )
  }
}

const FavoriteUpdate =(setRefresh, refresh)=> {
  
  let query = "SELECT * from " + favorite_tbl;
  let params = [];

  db.transaction(
    (tx)=> {
      tx.executeSql(query, params,(tx, results) =>{
        if(results.rows._array.length > 0){
          for(let i = 0; i < results.rows._array.length; i++){
            const { tabsIndex, mocksIndex} = results.rows._array[i];
            tabs.cuisine.uppedTabs[tabsIndex].mocks[mocksIndex].favorite = true;
          }
          setRefresh(!refresh);
        }
      }, function(tx,err) {
        console.log(err.message);
        return;
      })
    }
  );
}

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
    RemoveNote,
    FetchHistory,
    SnapShotListiner,
    FavoriteData,
    FavoriteUpdate,
    FavoriteGet,
    DeleteHistory
}