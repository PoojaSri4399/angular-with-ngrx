import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { selectBooks } from '../store/books.selector';
import { invokeBooksAPI, invokeDeleteBookAPI } from '../store/books.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { Appstate } from 'src/app/shared/store/appstate';
import { Router } from '@angular/router';

declare var window:any;


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
constructor(private store:Store,
  private appStore:Store<Appstate>
  ){}

//observable to store data via selector
books$ = this.store.pipe(select(selectBooks));
deleteModal:any;
idToDelete:number=0;

ngOnInit():void{

  this.deleteModal=new window.bootstrap.Modal(document.getElementById("deleteModal"))
  //invoking action-view all books
  this.store.dispatch(invokeBooksAPI());
}

openDeleteModal(id:number){
  this.idToDelete=id;
  this.deleteModal.show();
}
//delete book
delete(){
  this.store.dispatch(invokeDeleteBookAPI({id:this.idToDelete}));

  let appstatus$= this.appStore.pipe(select(selectAppState));
  appstatus$.subscribe((data)=>{
    if(data.apiStatus==='success'){
      this.appStore.dispatch(
      setAPIStatus({apiStatus:{apiStatus:'',apiResponseMessage:''}})
      );
      this.deleteModal.hide();
     }
});
}

}
