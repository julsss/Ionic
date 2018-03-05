import {Component, getPlatform, Inject} from '@angular/core';
import {IonicPage, NavController, Platform} from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';
import {HomePage} from "../home/home";
import {FirebaseApp} from "angularfire2";
import {AngularFireAuth} from "angularfire2/auth";
import firebase from 'firebase';
import {TabsPage} from "../tabs/tabs";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  userProfile: any = null;

  constructor(@Inject(FirebaseApp)firebase:any,public af:AngularFireAuth, public navCtrl: NavController, private googlePlus: GooglePlus, private platform : Platform) {
    firebase.auth().onAuthStateChanged( user => {
      if (user){
        this.userProfile = user;
        this.navCtrl.setRoot(TabsPage);
      } else {
        this.userProfile = null;
      }
    });
  }

  loginUser(){
    if(this.platform.is("cordova")) {
      this.googlePlus.login({
        'webClientId': '136045275169-mpr1gsqn8ud2rqa7d5jv918hpv75drrd.apps.googleusercontent.com',
        'offline': true
      }).then(res => {
        firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
          .then(success => {
            console.log("Firebase success: " + JSON.stringify(success));
            this.navCtrl.setRoot(TabsPage);
          })
          .catch(error => console.log("Firebase failure: " + JSON.stringify(error)));
      }).catch(err => console.error("Error: ", err));
    }
    else {
      return this.af.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(res => {
        console.log("angularfirebase success");
        this.navCtrl.setRoot(TabsPage);
      });
    }
  }

  /*loginUser(modeconnexion : string) {
    if(modeconnexion == "google"){
      console.log("GOOGLE");
      return this.authfirebase.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then(user => this.navCtrl.setRoot(HomePage));
    }
    else {
      console.log("FACEBOOK");
      return this.authfirebase.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then(user => this.navCtrl.setRoot(HomePage));
    }
  }*/

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
