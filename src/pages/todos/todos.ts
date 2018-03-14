import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {TodoServiceProvider} from "../../providers/todo-service/todo-service";
import {TodoList} from "../../model/todoList";
import {TodoPage} from "../todo/todo";
import {FirebaseProvider} from "../../providers/firebase/firebase";
import firebase from "firebase";
import {Observable} from "rxjs/Observable";
import {AngularFireList} from "angularfire2/database";

/**
 * Generated class for the TodosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-todos',
  templateUrl: 'todos.html',
  // providers: [[TodoServiceProvider]]
})
export class TodosPage {

  todoList: Observable<any[]>;
  nbItems : number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl : AlertController, private database : FirebaseProvider) {
    console.log("Constructor of TodosPage");
    //this.todoListAngFire = this.database.getAllTodoList();
    this.todoList = this.database.getAllTodoList().valueChanges();
  }

  itemSelected(n : string, uid : string ){
    this.navCtrl.push(TodoPage,{namelist: n, uid : uid});
  }

  editList(idList : string, old : string){
    let prompt = this.alertCtrl.create({
      title: 'Edit List',
      message: "Donnez un nouveau nom à la liste",
      inputs: [
        {
          name: 'nom',
          placeholder: old
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
            this.database.editTodoList(idList,data.nom);
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }

  presentConfirm(idList : string){
    let alert = this.alertCtrl.create({
      title : 'Comfirmation de la suppression',
      message : 'Voulez-vous vraiment supprimer cette liste ?',
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
            this.database.removeTodoList(idList);
            console.log('List supprimé');
          }
        }
      ]
    });
    alert.present();
  }

  ajoutList(){
    let prompt = this.alertCtrl.create({
      title: 'Ajout List',
      message: "Donnez un nom à la liste",
      inputs: [
        {
          name: 'nom',
          placeholder: 'Nom'
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
            this.database.addTodoList(data.nom);
          }
        }
      ]
    });
    prompt.present();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad TodosPage');
  }

}
