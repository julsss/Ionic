import {Component} from '@angular/core';
import {App, IonicPage, NavController, NavOptions, NavParams} from 'ionic-angular';
import firebase from 'firebase';
import {LoginPage} from "../login/login";
import {FirebaseProvider} from "../../providers/firebase/firebase";
import {LoginServiceProvider} from "../../providers/login-service/login-service";


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

  userProfile : firebase.User;

  constructor(public login : LoginServiceProvider, public app : App, public database : FirebaseProvider) {
    this.userProfile = database.userProfile;
  }

  logOut(){
    this.login.logOut();
    this.app.getRootNav().setRoot(LoginPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

}
