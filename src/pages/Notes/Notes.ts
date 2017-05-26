import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { NotesService } from './notes.service';
import { CategoryService } from '../Category/category.service';
import { CategoryClass } from '../Category/categoryModel';
import { NotesClass } from  './notesModel';
import { ToastController } from 'ionic-angular';


@Component({
  selector: 'page-notes',
  providers:[ NotesService, CategoryService],
  templateUrl: 'Notes.html',
  
})
export class NotesPage implements OnInit {

  errorMessage: string;
  notes: NotesClass[];
  ctgries: CategoryClass[];
  selectedNote: NotesClass;
  newnote: NotesClass = null;
  public show: boolean = false;


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private notservice: NotesService, 
    public alertCtrl: AlertController, 
    private catservice: CategoryService,
    private toastCtrl: ToastController) {}

  ngOnInit(): void {
    this.getNotes();
    console.log(this.notes); 
  }
  getNotes(){
    this.notservice.getNotes().subscribe(
      nots => this.notes = nots,
      error => this.errorMessage = <any>error);
  }
  getCategorie(): void {
    this.catservice.getCategory().subscribe(
      data =>  this.ctgries = data,
      error => this.errorMessage = <any>error);
  }
  NewNote(){
    this.newnote = new NotesClass;
    this.selectedNote = null;
    this.getCategorie();
  }
  savenewnote(newnote: NotesClass){
    
    this.notservice.newNote(newnote)
      .subscribe(
      note => this.notes.push(note), 
      error => this.errorMessage = <any>error);
      let toast = this.toastCtrl.create({
        message: `Note ajoutée`,
        duration: 3000
      });
      toast.present();
    this.newnote = null;
  }

  delnotes(note: NotesClass): void {

    this.notservice.delNote(note.id)
    .then(() => {
      this.notes = this.notes.filter(h => h !== note);
          if (this.selectedNote === note) { 
            this.selectedNote = null;
            let toast = this.toastCtrl.create({
            message: `Note Supprimée`,
            duration: 3000});
          toast.present(); 
          }
    });
  }
  editnote(notedit: NotesClass){
    this.getCategorie();
    this.newnote = null;
    this.selectedNote = new NotesClass;
    this.selectedNote = notedit;
     
  }
  savenote(notedit: NotesClass){
    this.notservice.updatenote(notedit)
    .subscribe(
      note => this.notes.push(note), 
      error => this.errorMessage = <any>error);
      this.canceledit();
  }
  canceledit(){
    this.newnote = null;
    this.selectedNote = null;
  }

}
