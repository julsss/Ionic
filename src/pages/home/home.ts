import { Component } from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import {AdMobFree, AdMobFreeBannerConfig} from "@ionic-native/admob-free";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private admobFree: AdMobFree) {
    this.displayBanner();
  }

  displayBanner() {
    const bannerConfig: AdMobFreeBannerConfig = {
      // we will just use a test id for this tutorial
      id: 'ca-app-pub-3314972172145285/3705739439',
      isTesting: true,
      autoShow: true,
      bannerAtTop:false // default is false
    };

    this.admobFree.banner.config(bannerConfig);

    this.admobFree.banner.prepare().then((result)=>{
      console.log(result);
    },(reason)=>{
      console.log(reason);
    });

  }
}
