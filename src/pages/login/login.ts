import {Component} from '@angular/core';
import {App, IonicPage} from 'ionic-angular';
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
      this.login.logInGoogle();
    }
    else {
      this.login.loginFB();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
