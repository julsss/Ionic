///<reference path="../../node_modules/angularfire2/auth/auth.module.d.ts"/>
import {Component, ViewChild} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {LoginPage} from "../pages/login/login";
import {LoginServiceProvider} from "../providers/login-service/login-service";
import {TabsPage} from "../pages/tabs/tabs";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild('myNav') nav;
  rootPage:any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, login : LoginServiceProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      login.isLogged.subscribe(logged => {
        if (logged){
          console.log("HELLLLLLLLLLOOOOOOOOOOO");
          this.nav.push(TabsPage);
        }
        else {
          this.nav.pop();
        }
      })
    });

  }


}
