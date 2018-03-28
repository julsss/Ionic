import {Component} from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import {TodosPage} from "../todos/todos";
import {ProfilePage} from "../profile/profile";
import {AdMobFree, AdMobFreeBannerConfig} from "@ionic-native/admob-free";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = TodosPage;
  tab2Root = ProfilePage;

  constructor(private admobFree: AdMobFree) {
    this.displayBanner();
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter TabsPage');
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

  displayBanner() {
    const bannerConfig: AdMobFreeBannerConfig = {
      // we will just use a test id for this tutorial
      //id: 'ca-app-pub-3314972172145285/3705739439',
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
