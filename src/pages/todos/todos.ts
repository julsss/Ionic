import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {TodoServiceProvider} from "../../providers/todo-service/todo-service";
import {TodoList} from "../../model/todoList";
import {TodoPage} from "../todo/todo";

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
  todoList: TodoList[] = [];
  error: string;
  complete: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl : AlertController, private todos : TodoServiceProvider) {
    console.log("Constructor of TodosPage");
    this.todos.getList().subscribe(
      list => {
          this.todoList = list;
        },
      error => this.error = error,
      () => this.complete = true
    );

  }

  itemSelected(n : string, uid : string ){
    this.navCtrl.push(TodoPage,{namelist: n, uid : uid});
  }

  editList(list : TodoList){
    let prompt = this.alertCtrl.create({
      title: 'Edit List',
      message: "Donnez un nouveau nom à la liste",
      inputs: [
        {
          name: 'nom',
          placeholder: list.name
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
            this.todos.editList(list.uuid,data.nom);
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }

  presentConfirm(todoList : TodoList){
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
            this.todos.deleteListTodo(todoList.uuid);
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
            this.todos.addList(data.nom);
            console.log('Saved clicked', this.todoList);
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
