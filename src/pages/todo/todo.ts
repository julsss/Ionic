import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {TodoItem} from "../../model/todoItem";
import {AlertController} from "ionic-angular";
import {TodoServiceProvider} from "../../providers/todo-service/todo-service";
import {ModalPage} from "../modal/modal";
import {FirebaseProvider} from "../../providers/firebase/firebase";
import {Observable} from "rxjs/Observable";
import {AngularFireList} from "angularfire2/database";

/**
 * Generated class for the TodoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-todo',
  templateUrl: 'todo.html',
})
export class TodoPage {

  uidlist : string;
  namelist : string;

  todoItemsAngFire: AngularFireList<any>;
  todoItems: Observable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams,private modalCtrl: ModalController, private alertCtrl : AlertController, private database : FirebaseProvider) {
    this.namelist = navParams.get('namelist');
    this.uidlist  = navParams.get('uid');


    this.todoItemsAngFire = this.database.getTodoItems(this.uidlist);
    this.todoItems = this.todoItemsAngFire.valueChanges();


  }

  presentModal() {
    let modal = this.modalCtrl.create(ModalPage, {uuidlist : this.uidlist, creation : true});
    modal.present();
  }

  editItem(iditem) {
    let currentTodo : TodoItem = new TodoItem();
    currentTodo.uuid = iditem.id;
    currentTodo.desc = iditem.desc;
    currentTodo.image = iditem.image;
    currentTodo.complete = iditem.complete;
    currentTodo.name = iditem.name;
    let modal = this.modalCtrl.create(ModalPage, {uuidlist : this.uidlist, creation : false, item : currentTodo});
    modal.present();
  }

  presentConfirm(idTodo : string){
    let alert = this.alertCtrl.create({
      title : 'Comfirmation de la suppression',
      message : 'Voulez-vous vraiment supprimer cet item ?',
      buttons : [
        {
          text : 'Annuler',
          role : 'Annuler',
          handler : () => {
            console.log('Action annuler');
          }
        },
        {
          text : 'Confirmer',
          handler: () => {
            this.database.deleteTodo(this.uidlist,idTodo);
            console.log('Item supprimé');
          }
        }
      ]
      });
    alert.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TodoPage');
  }

}
