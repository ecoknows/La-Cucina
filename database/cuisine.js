import { AsyncStorage } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { favorite_tbl ,history_tbl ,db } from './database';
import { tabs } from '../constants';

// FUNCTION TO BE EXPORT // ***************************************************

/* Favorite */
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

/* History */
const UpdateHistory =(data,isDataFetch, isCapacityChange, isDirectionChange, isNewDate, isNewTimeFinished, isImage, isIndex, isMocksTabs)=>{
    const {id,parent_id,favorite,capacity,ingredients, directions, newDate, time_finished, image, index, mocks_tabs} = data;
    let query = null;
    let params = null;
    let ingredientsMod = (ingredients=='') ? ' ' : ingredients;
    if(!isDataFetch.value){   
        query = "INSERT INTO "+ history_tbl +" (id,parent_id, favorite, capacity, ingredients, directions, date, time_finished, image, mocks_index, mocks_tabs) VALUES (null,?,?,?,?,?,?,?,?,?,?)";
        params = [parent_id,favorite,capacity,ingredientsMod,directions,newDate, time_finished,image, index, mocks_tabs];
    }else{
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
        params = [];
    }
    transaction(query,params);
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

const GetCapacityHistory =(id, setCapacity, original_capacity, ExistHistory)=>{
    let query = "SELECT * from " + history_tbl + " WHERE parent_id = " + id.toString();
    let params = [];
  
    transaction(query,params,
    (results)=>{
        if(results.rows._array.length > 0){
            setCapacity(results.rows._array[0].capacity);
            original_capacity.value=results.rows._array[0].capacity;
        }
    }
    );
}

const DeleteHistory =(id, setReset, reset)=>{
    let query = "DELETE from " + history_tbl + " WHERE id = " + id.toString();
    let params = []; 
  
    transaction(query,params, ()=>{
        setReset(!reset);
    });
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
    FavoriteDataUpdate,
    GetAllFavorite,
    UpdateHistory,
    GetHistory,
    GetCapacityHistory,
    DeleteHistory,
}