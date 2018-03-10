import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TodoServiceProvider} from "../../providers/todo-service/todo-service";
import {TodoItem} from "../../model/todoItem";
import {FirebaseProvider} from "../../providers/firebase/firebase";

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



  constructor(public navCtrl: NavController, public navParams: NavParams, private database : FirebaseProvider) {
    this.uuidlist = this.navParams.get('uuidlist');

    this.newTodo = new TodoItem();
    this.newTodo.name = "";
    this.newTodo.desc = "";
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

  editItem(){
    console.log(this.newTodo);
    this.database.editTodo(this.uuidlist,this.newTodo);
    this.navCtrl.pop();

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalPage');
  }

}
