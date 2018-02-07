import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TodoServiceProvider} from "../../providers/todo-service/todo-service";
import {TodoItem} from "../../model/todoItem";

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
  uuidItem : string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private todoService : TodoServiceProvider) {
    this.uuidlist = this.navParams.get('uuidlist');

    this.newTodo = new TodoItem();
    this.newTodo.complete = false;
    this.creation = this.navParams.get('creation');
    if(this.creation==false){
      this.newTodo = this.navParams.get('item');
    }
  }

  createItem(){
    console.log(this.newTodo);
    this.newTodo.uuid=this.newTodo.name + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    this.todoService.addItem(this.uuidlist, this.newTodo);
    this.navCtrl.pop();
  }

  editItem(){
    console.log(this.newTodo);
    this.todoService.editTodo(this.uuidlist, this.newTodo);
    this.navCtrl.pop();

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalPage');
  }

}
