import {Component, getPlatform, Inject} from '@angular/core';
import {App, IonicPage, NavController, Platform} from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';
import {Facebook, FacebookLoginResponse} from "@ionic-native/facebook";
import {HomePage} from "../home/home";
import {FirebaseApp} from "angularfire2";
import {AngularFireAuth} from "angularfire2/auth";
import firebase from 'firebase';
import {TabsPage} from "../tabs/tabs";
import {LoginServiceProvider} from "../../providers/login-service/login-service";

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

  constructor(public login : LoginServiceProvider, public app : App) {

  }


  loginUser(modeconnexion : string){
    if(modeconnexion == "google"){
      this.login.logInGoogle().then(res =>
        this.app.getRootNav().setRoot(TabsPage)
      )
    }
    else {
      this.login.loginFB().then(res =>
        this.app.getRootNav().setRoot(TabsPage)
      )
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
