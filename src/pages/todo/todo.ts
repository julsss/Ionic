import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {TodoItem} from "../../model/todoItem";
import {AlertController} from "ionic-angular";
import {TodoServiceProvider} from "../../providers/todo-service/todo-service";
import {ModalPage} from "../modal/modal";

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
  items : TodoItem[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,private modalCtrl: ModalController, private alertCtrl : AlertController, private todos : TodoServiceProvider) {
    this.namelist = navParams.get('namelist');
    this.uidlist  = navParams.get('uid');
    this.todos.getTodos(this.uidlist).subscribe(items => {
      this.items = items;
      console.log("On a une liste d'items!!!", items);
    });

  }

  presentModal() {
    let modal = this.modalCtrl.create(ModalPage, {uuidlist : this.uidlist, creation : true});
    modal.present();
  }

  editItem(iditem : TodoItem) {
    let modal = this.modalCtrl.create(ModalPage, {uuidlist : this.uidlist, creation : false, item : iditem});
    modal.present();
  }

  presentConfirm(todoItem : TodoItem){
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
            this.todos.deleteTodo(this.uidlist,todoItem.uuid);
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
