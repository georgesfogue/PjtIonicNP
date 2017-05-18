import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
//import { AddCategoryPage } from '../pages/Category/Addcategory';
import { CategoryService } from './category.service';
import { AlertController } from 'ionic-angular';


@Component({
  selector: 'page-category',
  providers:[ CategoryService ],
  templateUrl: 'Category.html'
})
export class CategoryPage implements OnInit {

  public allcat: any[];
  public getData: string;
  
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public alertCtrl: AlertController, 
    private catservice: CategoryService) {}

  ngOnInit(){ 
    this.catservice.getCategory().subscribe(
      data =>{ this.allcat = data},
       err => console.error(err),
       //() => console.log(this.allcat),
      null
    );
  }

  newcategory(){
    console.log("ajoueter cat");

    //this.navCtrl.push('');

  }

showPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'Ajouter une note',
      //message: "Ajouter une novelle note",
      inputs: [
        {
          name: 'categorie',
          placeholder: 'Categorie'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {  
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }

  savenewcat(cat: string){
    this.catservice.postCats(cat).subscribe(
        data => this.getData = JSON.stringify(data),
        error => alert(error),
        ()=> console.log("terminer")
      );
    console.log(this.getData);
  }

}
