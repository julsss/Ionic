import {Component} from '@angular/core';
import {App, IonicPage, NavController, NavOptions, NavParams} from 'ionic-angular';
import firebase from 'firebase';
import {LoginPage} from "../login/login";
import {FirebaseProvider} from "../../providers/firebase/firebase";


/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  userProfile : firebase.User = null;

  constructor(public app : App, public navCtrl: NavController, public navParams: NavParams, private database : FirebaseProvider) {
    this.userProfile=firebase.auth().currentUser;
  }

  logOut(){
    this.database.logOut();
    firebase.auth().signOut().then(()=>{
      this.app.getRootNav().setRoot(LoginPage);
      //this.navCtrl.setRoot(LoginPage);
      //this.navCtrl.popToRoot();
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

}
