import * as SQLite from 'expo-sqlite';
import {
    favorite_tbl,
    db,
} from './database';

import { tabs } from '../constants';
// FUNCTION TO BE EXPORT // ***************************************************
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
  
    transaction(query,params, 
        (results) => {
            if(results.rows._array.length > 0){
                for(let i = 0; i < results.rows._array.length; i++){
                  setData(results.rows._array);
                }
              }else{
                setData([]);
              }
        }
    )
    ;
}
const FavoriteDataUpdate =(data, fav_type)=>{
  const { tabsIndex, mocksIndex,recipe_id } = data;
  if(fav_type){
      let query = "INSERT INTO "+ favorite_tbl +" (id,recipe_id,tabsIndex,mocksIndex) VALUES (null,?,?,?)";
      let params = [recipe_id,tabsIndex, mocksIndex];
      transaction(query, params);
  }else {
      let query = "DELETE FROM "+ favorite_tbl +" WHERE recipe_id = "+ recipe_id.toString();
      let params = [];
      transaction(query, params);
  }
}

const GetAllFavorite =(setRefresh, refresh)=>{
  let query = "SELECT * from " + favorite_tbl;
  let params = [];
  transaction(query, params, (results)=>{
      if(results.rows._array.length > 0){
          for(let i = 0; i < results.rows._array.length; i++){
            const { tabsIndex, mocksIndex} = results.rows._array[i];
            tabs.cuisine.uppedTabs[tabsIndex].mocks[mocksIndex].recipe.favorite = true;
          }
          setRefresh(!refresh);
      }
  })
}


// MAIN DATA TRANSACTION
function transaction(query, params, func){
    db.transaction(
        (tx)=> {
        tx.executeSql(query, params,(tx, results) =>{
        if(func != undefined)
            func(results);
        }, function(tx,err) {
            console.log(err.message);
            return;
        })
        }
    )
}

export {
    FetchFavorite,
    FavoriteDataUpdate,
    GetAllFavorite
}