import {Component} from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import {TodosPage} from "../todos/todos";
import {ProfilePage} from "../profile/profile";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;
  tab4Root = TodosPage;
  tab5Root = ProfilePage;

  constructor() {

  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter TabsPage');
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
