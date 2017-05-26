import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CategoryService } from './category.service';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { CategoryClass } from  './categoryModel';


@Component({
  selector: 'page-category',
  providers:[ CategoryService],
  templateUrl: 'Category.html'
})
export class CategoryPage implements OnInit {

  errorMessage: string;
  categories: CategoryClass[];
  selectedCategory: CategoryClass;
  newcategory: CategoryClass = null;
  
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public alertCtrl: AlertController, 
    private catservice: CategoryService,
    public toastCtrl: ToastController) {}
  
  ngOnInit(): void {
    this.getCategory();
    console.log(this.categories); 
  }

  getCategory(){
    this.catservice.getCategory().subscribe(
      catg => this.categories = catg,
      error => this.errorMessage = <any>error);
  }
  NewCategory(){
    this.newcategory = new CategoryClass;
    this.selectedCategory = null;
  }
  savenewcategory(newcat: CategoryClass){
    this.catservice.postCats(newcat)
    .subscribe(
      categorie => this.categories.push(categorie), 
      error => this.errorMessage = <any>error);
      let toast = this.toastCtrl.create({
        message: `Categorie ajoutée`,
        duration: 3000
      });
      toast.present();
      this.newcategory = null;
  }

  delcat(cate: CategoryClass): void {
    this.catservice.delcategory(cate.id)
    .then(() => {
      this.categories = this.categories.filter(h => h !== cate);
          if (this.selectedCategory === cate) { this.selectedCategory = null; }
    });
  }
  editcat(cat: CategoryClass){
    this.newcategory = null;
    this.selectedCategory = new CategoryClass;
    this.selectedCategory = cat;     
  }

  savecategory(categ: CategoryClass){
    this.catservice.updatecategory(categ)
    .subscribe(
      note => this.categories.push(note), 
      error => this.errorMessage = <any>error);
      this.canceledit();
  }
  canceledit(){
    this.newcategory = null;
    this.selectedCategory = null;
  }

}
