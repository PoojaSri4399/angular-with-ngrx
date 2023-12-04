import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { Book } from './store/book';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private http:HttpClient) { }

//get all books
  get(){
    return this.http.get<Book[]>("http://localhost:3000/books"); //invoked by get loadallbooks effects
  }
  //add new book
  add(payload:Book){
    return this.http.post<Book>("http://localhost:3000/books",payload);//invoked by addnewbook effects
  }
  //edit book details
  update(payload:Book){
    return this.http.put<Book>(`http://localhost:3000/books/${payload.id}`,payload);// invoked by updatebook effect
  }
  //delete book
  delete(id:number){
    return this.http.delete(`http://localhost:3000/books/${id}`);// invoked by deletebook effect
  }

}
