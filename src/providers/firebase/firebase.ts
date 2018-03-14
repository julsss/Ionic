import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from "firebase";
import {TodoItem} from "../../model/todoItem";

@Injectable()
export class FirebaseProvider {

  userProfile : firebase.User = null;

  constructor(public database: AngularFireDatabase) {
    this.userProfile=firebase.auth().currentUser;
  }

  logOut(){
    this.database.database.goOffline();
  }

  getAllTodoList() {
    return this.database.list('/'+this.userProfile.uid+'/todoList');
  }

  getTodoItems(idList : string){
    return this.database.list('/'+this.userProfile.uid+'/todoList/'+idList+'/items');
  }

  /*  FONCTIONS QUI TRAITE LES LISTES*/

  editTodoList(idList:string,name:string){
    this.database.list('/'+this.userProfile.uid+'/todoList').update(idList,{name:name})
  }

  addTodoList(name) {
    const newTodoList = this.database.list('/'+this.userProfile.uid+'/todoList').push({});
    newTodoList.set({
      id: newTodoList.key,
      name: name,
      nbItems : 0
    });
  }

  removeTodoList(id) {
    this.database.list('/'+this.userProfile.uid+'/todoList/').remove(id);
  }

  /*  FONCTIONS QUI TRAITE LES ITEMS*/

  addTodo(idList : string,newTodoItem : TodoItem) {
    const newTodo = this.database.list('/'+this.userProfile.uid+'/todoList/'+idList+'/items/').push({});
    newTodo.set({
      id: newTodo.key,
      name: newTodoItem.name,
      desc: newTodoItem.desc,
      complete : newTodoItem.complete
    });

    this.database.object('/'+this.userProfile.uid+'/todoList/'+idList+'/nbItems').query.ref.transaction((items => items+1));
  }

  editTodo(idList : string,newTodoItem : TodoItem) {
    this.database.list('/'+this.userProfile.uid+'/todoList/'+idList+'/items').update(newTodoItem.uuid,{
      name: newTodoItem.name,
      desc: newTodoItem.desc,
      complete : newTodoItem.complete
    });
  }

  deleteTodo(idList : string, idTodoItem : string){
    this.database.list('/'+this.userProfile.uid+'/todoList/'+idList+'/items/').remove(idTodoItem);
    this.database.object('/'+this.userProfile.uid+'/todoList/'+idList+'/nbItems').query.ref.transaction((items => items-1));
  }

}
