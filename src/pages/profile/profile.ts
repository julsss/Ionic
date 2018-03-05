import {Component, Inject} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import {TabsPage} from "../tabs/tabs";
import {LoginPage} from "../login/login";


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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.userProfile=firebase.auth().currentUser;
  }

  logOut(){
    firebase.auth().signOut();
    this.navCtrl.setRoot(LoginPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

}
