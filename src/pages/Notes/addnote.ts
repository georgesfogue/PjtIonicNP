import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { NotesService } from './notes.service';
import { NotesPage } from './Notes';
import { CategoryService } from '../Category/category.service';

@Component({
  selector: 'page-addnotes',
  providers:[ NotesService, CategoryService ],
  templateUrl: 'addnote.html'
})
export class AddNotesPage implements OnInit {

  public allcatgy: any[];
  getData: any;
  new_note: any;

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams, 
      private notservice: NotesService, 
      public alertCtrl: AlertController, 
      private catservice: CategoryService) {

  }

  ngOnInit(){ 
    this.catservice.getCategory().subscribe(
      data =>{ this.allcatgy = data},
       err => console.error(err),
       //() => console.log(this.allcat),
      null
    );
  }

  savenewnote(title:string, content: string, category: string){

    this.notservice.newNote(title, content, category).subscribe(
     data => this.getData = JSON.stringify(data),
      err => console.error(err),
      ()=> console.log("terminer")
    );
    console.log(this.getData);
    this.navCtrl.push(NotesPage);

  }

}
