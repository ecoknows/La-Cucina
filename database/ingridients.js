import * as SQLite from 'expo-sqlite';
import { theme } from '../constants';
import { db, note_table, note_check_tbl} from './database';

// FUNCTION TO BE EXPORT // ***************************************************
const RemoveAllNotes =(func)=>{
    remove_all_note(func)
}
const AddInitialNotes =()=>{
    const array = theme.initial_note_data; 
    for(let i = 1; i < array.length; i++){
        add_note(array[i]);
    }
}

// FUNCTION TO BE NOT EXPORT // **********************************************
function add_note(data){
    const { title, date, color, note, isNote, isCheckList, checkList,} = data;

    let query = "INSERT INTO "+ note_table +" (id,title, date, color, note, isNote, isCheckList) VALUES (null,?,?,?,?,?,?)";
    let params = [title, date, color, note, isNote, isCheckList];


    const AddCheckList = (parent_id, checkList) => {
      const { _text, status } = checkList;
      let query = "INSERT INTO "+ note_check_tbl +" (id,parent_id, _text, status) VALUES (null,?,?,?)";
      let params = [parent_id, _text, status];

      transaction(query,params,(results)=>{
        checkList.id = results.insertId;
        console.log('Success CheckList!');
      });
    }

    transaction(query,params,(results)=>{
        let size = 0;
        if(checkList.length != 1 && checkList[0]._text != '' )
            size = checkList.length;
        
        for(let i = 0; i < size; i++){
            AddCheckList(results.insertId, checkList[i]);
        }
        console.log('Success Note!');
    });
}

function remove_all_note(func){
    let query = "DELETE from " + note_table;
    let params = [];
    transaction(query,params,()=>{
        func();
        remove_all_checklist();
        console.log(" All Notes has been deleted sir! :P ");
    });
}

function remove_all_checklist(){
    let query = "DELETE from " + note_check_tbl;
    let params = [];
    transaction(query,params,()=>{
        console.log(" All Checklist on Note has been deleted sir! :P ");
    });
}



// MAIN DATA TRANSACTION
function transaction(query, params, func){
    db.transaction(
        (tx)=> {
        tx.executeSql(query, params,(tx, results) =>{
            func(results);
        }, function(tx,err) {
            console.log(err.message);
            return;
        })
        }
    )
}

export {
    RemoveAllNotes,
    AddInitialNotes,
}