import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import {Observable} from "rxjs/Observable";
import firebase from "firebase";

/**
 * Generated class for the TodolistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-todolist',
  templateUrl: 'todolist.html',
})
export class TodolistPage {

  songsList: AngularFireList<any>;
  songs: Observable<any[]>;
  userProfile : firebase.User = null;

  constructor(public navCtrl: NavController,
              public afDB: AngularFireDatabase,
              public alertCtrl: AlertController) {
    this.userProfile=firebase.auth().currentUser;
    this.songsList = this.afDB.list('/'+this.userProfile.uid+'/todoList');
    this.songs = this.songsList.valueChanges();
  }

  addSong() {
    let prompt = this.alertCtrl.create({
      title: 'Song Name',
      message: "Enter a name for this new song you're so keen on adding",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title'
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
            const newSongRef = this.songsList.push({});

            newSongRef.set({
              id: newSongRef.key,
              title: data.title,
            });
            /*this.songsList=this.afDB.list('/'+this.userProfile.uid+'/todoList/'+newSongRef.key+'/items');
            this.songs = this.songsList.valueChanges();*/
          }
        }
      ]
    });
    prompt.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TodolistPage');
  }

}
