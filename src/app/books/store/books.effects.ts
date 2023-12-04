import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { BooksService } from "../books.service";
import { AddBookAPISuccess, DeleteBookAPISuccess, UpdateBookAPISuccess, booksFetchAPISuccess, invokeAddBookAPI, invokeBooksAPI, invokeDeleteBookAPI, invokeUpdateBookAPI } from "./books.action";
import {EMPTY, map,switchMap ,withLatestFrom} from "rxjs";
import { Store, select } from "@ngrx/store";
import { Appstate } from "src/app/shared/store/appstate";
import { setAPIStatus } from "src/app/shared/store/app.action";
import { selectBooks } from "./books.selector";


@Injectable()
export class BooksEffects {
    constructor(private action$:Actions,
        private bookService:BooksService,
        private appStore:Store<Appstate>,
        private store:Store){}

    //get all books
    loadAllBooks$=createEffect(()=>
                this.action$.pipe(
                    ofType(invokeBooksAPI),
                    withLatestFrom(this.store.pipe(select(selectBooks))),
                    switchMap(([,booksFromStrore])=>{
                        if(booksFromStrore.length>0){
                            return EMPTY;
                        }
                        return this.bookService.get().pipe(
                            map((data)=> booksFetchAPISuccess({allBooks:data})) //return data back to action
                        );
                    })
                )
    );

    //add book
    addNewBook$=createEffect(()=>
                    this.action$.pipe(
                        ofType(invokeAddBookAPI),
                        switchMap((action)=>{
                            //this.appStore.dispatch(setAPIStatus({apiStatus:{apiResponseMessage:'',apiStatus:''}}))
                            return this.bookService
                            .add(action.payload)
                            .pipe(map((data)=>{
                                    //success setting
                                    this.appStore.dispatch(setAPIStatus({apiStatus:{apiResponseMessage:'',apiStatus:'success'},}));
                                    return AddBookAPISuccess({response:data});
                                })
                            );
                        })
                    )
    );

    //update book
    updateBook$=createEffect(()=>
                    this.action$.pipe(
                        ofType(invokeUpdateBookAPI),
                        switchMap((action)=>{
                            this.appStore.dispatch(setAPIStatus({apiStatus:{apiResponseMessage:'',apiStatus:''}}))
                            return this.bookService
                            .update(action.payload)
                            .pipe(map((data)=>{
                                    this.appStore.dispatch(setAPIStatus({apiStatus:{apiResponseMessage:'',apiStatus:'success'},}));
                                    return UpdateBookAPISuccess({response:data});
                                })
                            );
                        })
                    )
    );

    //delete book
    deleteBook$=createEffect(()=>
    this.action$.pipe(
        ofType(invokeDeleteBookAPI),
        switchMap((action)=>{
            this.appStore.dispatch(setAPIStatus({apiStatus:{apiResponseMessage:'',apiStatus:''}}))
            return this.bookService
            .delete(action.id)
            .pipe(map((data)=>{
                    this.appStore.dispatch(setAPIStatus({apiStatus:{apiResponseMessage:'',apiStatus:'success'},}));
                    return DeleteBookAPISuccess({id:action.id});
                })
            );
        })
    )
);


}

