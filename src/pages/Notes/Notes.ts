import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { NotesService } from './notes.service';
import { AddNotesPage } from './addnote';
import { CategoryService } from '../Category/category.service';


@Component({
  selector: 'page-notes',
  providers:[ NotesService, CategoryService,AddNotesPage ],
  templateUrl: 'Notes.html',
  
})
export class NotesPage implements OnInit {

  public allnot: any[];
  public allcatgy: any[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private notservice: NotesService, 
    public alertCtrl: AlertController, 
    private catservice: CategoryService) {
  }

  ngOnInit(){ 
    this.notservice.getnotes().subscribe(
      data =>{ this.allnot = data},
       err => console.error(err),
       //() => console.log(this.allcat),
      null
    );
  }

  newnote(){
    this.navCtrl.push(AddNotesPage);
  }
  dellnotes(id: number){
    this.notservice.DelNote(id);
    this.navCtrl.push(NotesPage);
  }

}
