import { createReducer,on } from "@ngrx/store";
import { Book } from "./book";
import { AddBookAPISuccess, DeleteBookAPISuccess, UpdateBookAPISuccess, booksFetchAPISuccess } from "./books.action";
import { state } from "@angular/animations";

export const initialState:ReadonlyArray<Book>=[];
export const bookReducer=createReducer(
    initialState,
    on(booksFetchAPISuccess,(state,{allBooks})=>{
        return allBooks;
    }),
    on(AddBookAPISuccess,(state,{response})=>{
       let newState=[...state];
       newState.unshift(response);
       return newState;
    }),
    on(UpdateBookAPISuccess,(state,{response})=>{
        let newState=state.filter(_=>_.id!==response.id);
        newState.unshift(response);
        return newState;
    }),
    on(DeleteBookAPISuccess,(state,{id})=>{
        let newState=state.filter(_=>_.id!==id);
        return newState;
    })

)