import {Component} from '@angular/core';
import {App, IonicPage, ToastController} from 'ionic-angular';
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

  constructor(public login : LoginServiceProvider, public app : App, private toastCtrl: ToastController) {

  }


  loginUser(modeconnexion : string){
    if(modeconnexion == "google"){
      this.login.logInGoogle();
    }
    else {
      let toast = this.toastCtrl.create({
        message: "La connexion Facebook ne marche pas",
        duration: 3000,
        position: 'bottom'
      });

      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });

      toast.present();
      //this.login.loginFB();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
