import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TodoItem} from "../../model/todoItem";
import {FirebaseProvider} from "../../providers/firebase/firebase";
import {ImageServiceProvider} from "../../providers/image-service/image-service";

/**
 * Generated class for the ModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {

  newTodo : TodoItem;
  uuidlist : string;
  creation : boolean;



  constructor(public navCtrl: NavController, public navParams: NavParams, private database : FirebaseProvider, private img : ImageServiceProvider) {
    this.uuidlist = this.navParams.get('uuidlist');

    this.newTodo = new TodoItem();
    this.newTodo.name = "";
    this.newTodo.desc = "";
    this.newTodo.image = "assets/imgs/No_Image_Available.jpg";
    this.newTodo.complete = false;
    this.creation = this.navParams.get('creation');
    if(this.creation==false){
      this.newTodo = this.navParams.get('item');
    }
  }

  createItem(){
    console.log(this.newTodo);
    this.database.addTodo(this.uuidlist,this.newTodo);
    this.navCtrl.pop();
  }

  selectImage(){
    this.img.selectImage().then(res =>{
      console.log(this.newTodo.image);
      if (this.database.imageExist(this.newTodo.image)){
        this.database.deleteImageItem(this.newTodo.image);
      }
      this.newTodo.image = res;
    });
  }

  takeImage(){
    this.img.takeImage().then(res => {
      console.log(this.newTodo.image);
      if (this.database.imageExist(this.newTodo.image)){
        this.database.deleteImageItem(this.newTodo.image);
      }
      this.newTodo.image = res;
    });
  }

  showImage(){
    return this.newTodo.image;
  }

  editItem(){
    console.log(this.newTodo);
    this.database.editTodo(this.uuidlist,this.newTodo);
    this.navCtrl.pop();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalPage');
  }

}
