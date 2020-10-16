import * as SQLite from 'expo-sqlite';
import { theme } from '../constants';
import { GetRowNoteStatus } from './async_storage';
import { 
    db, 
    note_table, 
    note_check_tbl, 
    paging_limit,
} from './database';

// FUNCTION TO BE EXPORT // ***************************************************

const StartingNotes =(dataState)=>{
    const {setStateData1, setStateData2, setIsFirstRow, id_latest} = dataState;
    GetRowNoteStatus(setIsFirstRow);
    latest_pagination(setStateData1, setStateData2,id_latest);
}

const RemoveAllNotes =(func)=>{
    remove_all_note(func)
}
const AddInitialNotes =()=>{
    const array = theme.initial_note_data; 
    for(let i = 1; i < array.length; i++){
        add_note(array[i]);
    }
}

const AddNote =(data)=>{
    add_note(data);
}

const RemoveNote =(id)=>{
    remove_note(id);
}

const LoadNextNotes =(setStateData1,setStateData2, paging_limit, _1_data, _2_data)=>{
    let query = ' ';
    let params = []; 
    if(fetching_nextPage){
        query = currentOffset == -1 ? "SELECT * from " + note_table + " ORDER BY id DESC LIMIT " + paging_limit  :
                "SELECT * from " + note_table + " WHERE id < "+ currentOffset.toString() +" ORDER BY id DESC LIMIT " + paging_limit;
  
        transaction(query,params, 
            (results)=>{ 
                if(results.rows._array.length > 0){
                    let evenArray = results.rows._array.filter((a,i)=>i%2===0);
                    let oddArray = results.rows._array.filter((a,i)=>i%2===1);
                    _1_data.value = true;
                    _2_data.value = true;
                    setStateData1(items=> [...items, ...oddArray]);
                    setStateData2(items=> [...items, ...evenArray]);
    
                    currentOffset = results.rows._array[results.rows._array.length-1].id;
                }
                fetching_nextPage = true;
            }     
        );
      fetching_nextPage = false;
    }
}

const UpdateNotes =(change, id, table_id)=>{
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
        let params = [];

        transaction(query,params);
    }
}
  
const NoteChangesQuery =(data)=>{
    const { save, post } = data;
    let addQuery = ' ';
    addQuery = save.title != post.title ? addQuery + "title = '" + post.title +"', " : addQuery;
    addQuery = save.note != post.note ? addQuery + "note = '" + post.note +"', " : addQuery;
    addQuery = save.color != post.color ? addQuery + "color = '" + post.color +"', " : addQuery ;
    addQuery = save.date != post.date ? addQuery + "date = '" + post.date +"', " : addQuery ;
    addQuery = (save.isCheckList != post.isCheckList) ? addQuery + "isCheckList = " + (post.isCheckList ?  '1': '0') +", " : addQuery ;
    addQuery = (save.isNote != post.isNote) ? addQuery + "isNote = " + (post.isNote ? "1" : "0") +", " : addQuery ;
    
    return addQuery == ' ' ? ' ' : addQuery.slice(0, -2);
}


const NoteChecklistUpdate =(data)=>{
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
        postCheckList[i].id = saveCheckList[i].id;
        if(addQuery != ' '){
          let query = "UPDATE "+ note_check_tbl +" SET" + addQuery.slice(0,-2) + " WHERE id = " + saveCheckList[i].id.toString();
          let params = [];
          transaction(query,params);
        }
  
      }
  
    if(postCheckList.length > saveCheckList.length ){

      let i = saveCheckList[0].id == null ? 0 : saveCheckList.length;
      for( ; i < postCheckList.length; i++){
        let query = "INSERT INTO "+ note_check_tbl +" (id,parent_id, _text, status) VALUES (null,?,?,?)";
        let params = [post.id, postCheckList[i]._text, postCheckList[i].status ? 1 : 0];
        let stat_i = i;
        transaction(query,params,
        (results)=>{
            postCheckList[stat_i].id = results.insertId;
        }    
        );
      }
    }
    if(postCheckList.length < saveCheckList.length ){
      let i = postCheckList.length;
      for( ; i < saveCheckList.length; i++){
        let query = "DELETE FROM "+ note_check_tbl +" WHERE id = " + saveCheckList[i].id.toString();
        let params = [];
  
        transaction(query,params);
  
      }
    }
  
}


const GetNoteCheckList =(array,stateData,setStateData,index)=>{
    let query = "SELECT * from " + note_check_tbl + " WHERE parent_id = " + array.id;
    let params = [];
  
    transaction(query,params,
    (results)=>{
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
          }else{
            array.checkList = [{_text:'', status: false}];
          }
    }    
    );
  
  
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
        if(checkList.length != 1 || checkList[0]._text != '' )
            size = checkList.length;
        for(let i = 0; i < size; i++){
            AddCheckList(results.insertId, checkList[i]);
        }
        console.log('Success Note!');
    });
}

const remove_note =(id)=>{
    let query = "DELETE from " + note_table + " WHERE id = " + id;
    let params = [];
  
    transaction(query,params, 
        (results)=>{
            query = "DELETE from " + note_check_tbl + " WHERE parent_id = " + id;
            transaction(query,params);
        }
    )
  
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

function latest_pagination(setStateData1, setStateData2,id_latest){
    let query = "SELECT * from " + note_table + " ORDER BY id DESC LIMIT 10";
    let params = [];

    transaction(query,params,
    (results)=>{
        if(results.rows._array.length > 0){
            let evenArray = results.rows._array.filter((a,i)=>i%2===0);
            let oddArray = results.rows._array.filter((a,i)=>i%2===1);
            id_latest.value = results.rows._array[0].id + 1;
            setStateData1(items=> [...items, ...oddArray]);
            setStateData2(items=> [...items, ...evenArray]);
            currentOffset = results.rows._array[results.rows._array.length-1].id;
          }
    }    
    )

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
// VARAIBLES *// **************************
let fetching_nextPage = true;
let currentOffset = -1;


export {
    RemoveAllNotes,
    AddInitialNotes,
    AddNote,
    RemoveNote,
    LoadNextNotes,
    StartingNotes,
    UpdateNotes,
    NoteChangesQuery,
    NoteChecklistUpdate,
    GetNoteCheckList,
}
