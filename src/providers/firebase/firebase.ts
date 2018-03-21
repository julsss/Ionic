import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from "firebase";
import {TodoItem} from "../../model/todoItem";

@Injectable()
export class FirebaseProvider {

  userProfile : firebase.User = null;

  constructor(public database: AngularFireDatabase) {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.userProfile = user;
          this.database.database.goOnline();
        } else {
          console.log("user egale null !!!!!");
          this.database.database.goOffline();
          this.userProfile = null;
        }
      }
    )
    this.userProfile=firebase.auth().currentUser;
  }

  getAllTodoList() {

    return this.database.list('/todoList',
      ref => ref.orderByChild('users/'+this.userProfile.uid).equalTo(true));

    //return this.database.list('/'+this.userProfile.uid+'/todoList');
  }

  getTodoItems(idList : string){
    return this.database.list('/todoList/'+idList+'/items');
  }

  /*  FONCTIONS QUI TRAITE LES LISTES*/

  editTodoList(idList:string,name:string){
    this.database.list('/todoList').update(idList,{name:name})
  }

  addTodoList(name) {
    const newTodoList = this.database.list('/todoList').push({});
    newTodoList.set({
      id: newTodoList.key,
      name: name,
      nbItems : 0,
    });
    this.database.list('/todoList/'+newTodoList.key+'/users').set(this.userProfile.uid,true);
  }

  removeTodoList(id) {
    this.database.list('/todoList/'+id+'/users/').remove(this.userProfile.uid);
    let no_child : boolean;
    firebase.database().ref().child('/todoList/'+id+'/users/')
      .once('value', function (snapshot) {
        no_child = !snapshot.hasChildren();
    });
    if (no_child){
      this.database.list('/todoList/').remove(id);
    }
      //this.database.list('/todoList/').remove(id);
  }

  addTodoListShared(idList){
    this.database.list('/todoList/'+idList+'/users').set(this.userProfile.uid,true);
  }

  /*  FONCTIONS QUI TRAITE LES ITEMS*/

  addTodo(idList : string,newTodoItem : TodoItem) {
    if (newTodoItem.image.startsWith("data:image/jpeg;base64,")){
      console.log("ADD TODO IMAGE != null");
      this.uploadImageItem(newTodoItem.image).then( res => {
        const newTodo = this.database.list('/todoList/' + idList + '/items/').push({});
        newTodo.set({
          id: newTodo.key,
          name: newTodoItem.name,
          desc: newTodoItem.desc,
          image: res.downloadURL,
          complete: newTodoItem.complete
        });
        console.log(res.downloadURL);
        this.database.object('/todoList/' + idList + '/nbItems').query.ref.transaction((items => items + 1));
      });
    }
    else {
      console.log("ADD TODO IMAGE == null");
      const newTodo = this.database.list('/todoList/' + idList + '/items/').push({});
      newTodo.set({
        id: newTodo.key,
        name: newTodoItem.name,
        desc: newTodoItem.desc,
        image: newTodoItem.image,
        complete: newTodoItem.complete
      });

      this.database.object('/todoList/' + idList + '/nbItems').query.ref.transaction((items => items + 1));
    }
  }

  editTodo(idList : string,newTodoItem : TodoItem) {
    if(!newTodoItem.image.startsWith("data:image/jpeg;base64,")){
      console.log("EDIT TODO SAME IMAGE");
      this.database.list('/todoList/'+idList+'/items').update(newTodoItem.uuid,{
        name: newTodoItem.name,
        desc: newTodoItem.desc,
        image: newTodoItem.image,
        complete : newTodoItem.complete
      });
    }
    else {
      console.log("EDIT TODO NEW IMAGE");
      this.uploadImageItem(newTodoItem.image).then( res => {
        newTodoItem.image = res.downloadURL;
        this.database.list('/todoList/'+idList+'/items').update(newTodoItem.uuid,{
          name: newTodoItem.name,
          desc: newTodoItem.desc,
          image: newTodoItem.image,
          complete : newTodoItem.complete
        });
      });
    }
  }

  deleteTodo(idList : string, idTodoItem : string){
    this.database.list('/todoList/'+idList+'/items/').remove(idTodoItem);
    this.database.object('/todoList/'+idList+'/nbItems').query.ref.transaction((items => items-1));
  }

  //POUR LES IMAGES

  uploadImageList(imageString) : Promise<any>
  {
    let image       : string  = 'list-' + new Date().getTime() + '.jpg',
      storageRef  : any,
      parseUpload : any;

    return new Promise((resolve, reject) =>
    {
      storageRef       = firebase.storage().ref('image-todo-list/' + image);
      parseUpload      = storageRef.putString(imageString, 'data_url');

      parseUpload.on('state_changed', (_snapshot) =>
        {
          // We could log the progress here IF necessary
          //console.log('snapshot progess ' + _snapshot);
        },
        (_err) =>
        {
          reject(_err);
        },
        (success) =>
        {
          resolve(parseUpload.snapshot);
        });
    });
  }

  uploadImageItem(imageString) : Promise<any>
  {
    let image       : string  = 'item-' + new Date().getTime() + '.jpg',
      storageRef  : any,
      parseUpload : any;

    return new Promise((resolve, reject) =>
    {

      storageRef       = firebase.storage().ref('image-todo-item/' + image);
      parseUpload      = storageRef.putString(imageString, 'data_url');

      parseUpload.on('state_changed', (_snapshot) =>
        {
          // We could log the progress here IF necessary
          //console.log('snapshot progess ' + _snapshot);
        },
        (_err) =>
        {
          reject(_err);
        },
        (success) =>
        {
          resolve(parseUpload.snapshot);
        });
    });
  }

  imageExist(image){
    return !(image.startsWith("assets/imgs") || image.startsWith("data:image/jpeg;base64,"));
  }

  deleteImageItem(image){
    firebase.storage().refFromURL(image).delete();
  }

}
