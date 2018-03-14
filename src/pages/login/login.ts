import {Component, getPlatform, Inject} from '@angular/core';
import {App, IonicPage, NavController, Platform} from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';
import {Facebook, FacebookLoginResponse} from "@ionic-native/facebook";
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

  constructor(@Inject(FirebaseApp)firebase:any,public app : App,public af:AngularFireAuth, public navCtrl: NavController,private facebook : Facebook, private googlePlus: GooglePlus, private platform : Platform) {
    firebase.auth().onAuthStateChanged( user => {
      if (user){
        this.userProfile = user;
        this.navCtrl.setRoot(TabsPage);
      } else {
        this.userProfile = null;
      }
    });

  }


  loginUser(modeconnexion : string){
    if(this.platform.is("cordova")) {
      if(modeconnexion == 'google'){
        this.googlePlus.login({
          'webClientId': '136045275169-mpr1gsqn8ud2rqa7d5jv918hpv75drrd.apps.googleusercontent.com',
          'offline': true
        }).then(res => {
          firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
            .then(success => {
              console.log("Firebase success: " + JSON.stringify(success));
              this.navCtrl.setRoot(TabsPage);
              this.navCtrl.popToRoot();
            })
            .catch(error => console.log("Firebase failure: " + JSON.stringify(error)));
        }).catch(err => console.error("Error: ", err));
      }
      else {
        /*this.facebook.login(
          ['public_profile', 'user_friends', 'email']
        ).then((res: FacebookLoginResponse) => console.log('Logged into Facebook!', res))
          .catch(e => console.log('Error logging into Facebook', e));*/
      }
    }
    else {
      if(modeconnexion == 'google') {
        return this.af.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(res => {
          console.log("google angularfirebase success");
          this.app.getRootNav().setRoot(TabsPage);
          //this.navCtrl.setRoot(TabsPage);
          //this.navCtrl.popToRoot();
        });
      }
      else {
        return this.af.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(res => {
          this.app.getRootNav().setRoot(TabsPage);
          //this.navCtrl.setRoot(TabsPage);
          //this.navCtrl.popToRoot();
          console.log("facebook angularfirebase success");
        });
      }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
