///<reference path="../../node_modules/angularfire2/database/database.module.d.ts"/>
///<reference path="../../node_modules/@ionic-native/camera/index.d.ts"/>
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GooglePlus } from '@ionic-native/google-plus';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import {AngularFireModule, FirebaseApp} from "angularfire2";
import { AngularFireAuthModule } from 'angularfire2/auth'
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {TodosPage} from "../pages/todos/todos";
import { TodoServiceProvider } from '../providers/todo-service/todo-service';
import {TodoPage} from "../pages/todo/todo";
import {ModalPage} from "../pages/modal/modal";
import {LoginPage} from "../pages/login/login";
import * as firebase from "firebase";


import { config } from "./app.firebase.config"
import {ProfilePage} from "../pages/profile/profile";
import {Facebook} from "@ionic-native/facebook";
import {AngularFireDatabaseModule} from "angularfire2/database";
import { FirebaseProvider } from '../providers/firebase/firebase';
import { LoginServiceProvider } from '../providers/login-service/login-service';
import { ImageServiceProvider } from '../providers/image-service/image-service';
import { PreloaderServiceProvider } from '../providers/preloader-service/preloader-service';
import {Camera} from "@ionic-native/camera";
@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    TodosPage,
    TodoPage,
    ModalPage,
    LoginPage,
    ProfilePage
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    TodosPage,
    TodoPage,
    ModalPage,
    LoginPage,
    ProfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    TodoServiceProvider,
    GooglePlus,
    Facebook,
    FirebaseProvider,
    LoginServiceProvider,
    ImageServiceProvider,
    PreloaderServiceProvider,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
