import {Inject, Injectable} from '@angular/core';
import {App, Platform} from "ionic-angular";
import {FirebaseApp} from "angularfire2";
import {AngularFireAuth} from "angularfire2/auth";
import {Facebook, FacebookLoginResponse} from "@ionic-native/facebook";
import {GooglePlus} from "@ionic-native/google-plus";
import firebase from "firebase";
import {FirebaseProvider} from "../firebase/firebase";
import {Subject} from "rxjs/Subject";

/*
  Generated class for the LoginServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginServiceProvider {

  isLogged : Subject<boolean>;

  constructor(@Inject(FirebaseApp)firebase:any,public app : App,public af:AngularFireAuth,
              private facebook : Facebook, private googlePlus: GooglePlus, private platform : Platform,
              private database : FirebaseProvider) {
    this.isLogged = new Subject<boolean>();
    firebase.auth().onAuthStateChanged( user => {
      if (user){
        //this.database.userProfile = user;
        this.isLogged.next(true);
        console.log("mon id est : "+this.database.userProfile.uid);
      } else {
        console.log("user egale null !!!!!")
        //this.database.userProfile = null;
        this.isLogged.next(false);
      }
    });

  }

  logInGoogle(){
    if(this.platform.is("cordova")) {
      this.googlePlus.login({
        'webClientId': '136045275169-mpr1gsqn8ud2rqa7d5jv918hpv75drrd.apps.googleusercontent.com',
        'offline': true
      }).then(res => {
        firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
          .then(success => {
            console.log("Firebase success: " + JSON.stringify(success));
            //this.isLogged.next(true);
            //this.navCtrl.push(TabsPage);
            //this.navCtrl.popToRoot();
          })
          .catch(error => console.log("Firebase failure: " + JSON.stringify(error)));
      }).catch(err => console.error("Error: ", err));
    }
    else {
      return this.af.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(res => {
        console.log("google angularfirebase success");
        //this.isLogged.next(true);
        //this.app.getRootNav().setRoot(TabsPage);
        //this.navCtrl.push(TabsPage);
        //this.navCtrl.popToRoot();
      });
    }
  }

  loginFB(){
    if(this.platform.is("cordova")) {
        this.facebook.login(
          ['public_profile', 'user_friends', 'email']
        ).then((res: FacebookLoginResponse) => console.log('Logged into Facebook!', res))
          .catch(e => console.log('Error logging into Facebook', e));
    }
    else {
      return this.af.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(res => {
        //this.app.getRootNav().setRoot(TabsPage);
        //this.navCtrl.push(TabsPage);
        //this.navCtrl.popToRoot();
        //this.isLogged.next(true);
        console.log("facebook angularfirebase success");
      });
    }
  }

  logOut(){
    firebase.auth().signOut();
  }

}
