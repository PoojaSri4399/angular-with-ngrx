import { Component, OnInit } from '@angular/core';
import { Book } from '../store/book';
import { select,Store } from '@ngrx/store';
import { invokeAddBookAPI } from '../store/books.action';
import { Appstate } from 'src/app/shared/store/appstate';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { Router } from '@angular/router';
import { setAPIStatus } from 'src/app/shared/store/app.action';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
constructor(private store:Store,
  private appStore:Store<Appstate>,
  private router:Router){}

bookForm:Book={
  id:0,
  title:'',
  author:'',
  price:0
}

ngOnInit():void{

}
add(){
  //add process
    this.store.dispatch(invokeAddBookAPI({payload:{...this.bookForm}}));
  //api success
    let appstatus$= this.appStore.pipe(select(selectAppState));
    appstatus$.subscribe((data)=>{
      if(data.apiStatus==='success'){
        this.appStore.dispatch(
        setAPIStatus({apiStatus:{apiStatus:'',apiResponseMessage:''}})
        );
        this.router.navigate(['/']);
       }
});
}
}
