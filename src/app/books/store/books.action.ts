import { createAction, props } from "@ngrx/store";
import { Book } from "./book";
//trigger action from component

//load books
//1.get all books-to api
export const invokeBooksAPI = createAction(
    //"[source] type of event"
    "[Books API] invoke books Fetch API"
)
//2.fetch book details-from api
export const booksFetchAPISuccess = createAction(
    "[Books API] books fetch API success",
    props<{allBooks:Book[]}>()
    //props-additional metadata need for handling actions
)
//add book
//1.add book-to api
export const invokeAddBookAPI = createAction(
    "[Books API] invoke add book API",
    props<{payload:Book}>()
)
//2.add book-from api
export const AddBookAPISuccess = createAction(
    "[Books API] add book API success",
    props<{response:Book}>()
)

//update book
//1.update book - to api
export const invokeUpdateBookAPI=createAction(
    "[Book API] invoke update book API",
    props<{payload:Book}>()
)
//2.update book -from api
export const UpdateBookAPISuccess=createAction(
    "[Books API] update book API success",
    props<{response:Book}>()
)

//delete book
//1.delete book-to api
export const invokeDeleteBookAPI=createAction(
    "[Book API] invoke delete book API",
    props<{id:number}>()
)
//2.delete book -from api
export const DeleteBookAPISuccess=createAction(
    "[Books API] delete book API success",
    props<{id:number}>()
)
