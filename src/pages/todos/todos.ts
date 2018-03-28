import { Component } from '@angular/core';
import {AlertController, IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {TodoPage} from "../todo/todo";
import {FirebaseProvider} from "../../providers/firebase/firebase";
import {Observable} from "rxjs/Observable";
import {BarcodeScanner} from "@ionic-native/barcode-scanner";
import {ModalQrcodePage} from "../modal-qrcode/modal-qrcode";
import {LocalNotifications} from "@ionic-native/local-notifications";
import {Vibration} from "@ionic-native/vibration";

/**
 * Generated class for the TodosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-todos',
  templateUrl: 'todos.html',
})
export class TodosPage {

  todoList: Observable<any[]>;
  userid : string;
  typeList ='All';
  scannedCode = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl : AlertController,
              private database : FirebaseProvider,private barcodeScanner: BarcodeScanner,
              private modalCtrl : ModalController, private localNotifications: LocalNotifications,
              private vibr : Vibration) {
    console.log("Constructor of TodosPage");
    //this.todoListAngFire = this.database.getAllTodoList();
    this.userid=this.database.userProfile.uid;
    this.todoList = this.database.getAllTodoList().valueChanges();
    this.database.getAllTodoList().valueChanges().subscribe(res =>{
        this.localNotifications.schedule({
          id: 1,
          text: 'Une Liste a été modifié',
        });
        this.vibr.vibrate(1000);
        console.log("LISTE CHANGE !!!!!!!");
      }
    )

  }



  changeList(){
    if (this.typeList === 'My'){
      console.log("Mytodolist");
      console.log(this.typeList);
      this.todoList = this.database.getMyTodoList().valueChanges();
    }
    else {
      console.log("Othertodolist");
      console.log(this.typeList);
      this.todoList = this.database.getAllTodoList().valueChanges();
    }
  }

  scanCode() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.scannedCode = barcodeData.text;
      console.log(this.scannedCode);
      this.database.addTodoListShared(this.scannedCode);
    }, (err) => {
      console.log('Error: ', err);
    });
  }

  presentModal(uidlist) {
    let modal = this.modalCtrl.create(ModalQrcodePage, {uuidlist : uidlist});
    modal.present();
  }


  itemSelected(n : string, uid : string, nbitems ){
    this.navCtrl.push(TodoPage,{namelist: n, uid : uid, nbitem: nbitems });
  }

  editList(idList : string, old : string){
    let prompt = this.alertCtrl.create({
      title: 'Edit List',
      message: "Donnez un nouveau nom à la liste",
      inputs: [
        {
          name: 'nom',
          placeholder: old
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.database.editTodoList(idList,data.nom);
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }

  presentConfirm(idList : string){
    let alert = this.alertCtrl.create({
      title : 'Comfirmation de la suppression',
      message : 'Voulez-vous vraiment supprimer cette liste ?',
      buttons : [
        {
          text : 'Annuler',
          role : 'Annuler',
          handler : () => {
            console.log('Action annuler');
          }
        },
        {
          text : 'Confirmer',
          handler: () => {
            this.database.removeTodoList(idList);
            console.log('List supprimé');
          }
        }
      ]
    });
    alert.present();
  }

  ajoutList(){
    let prompt = this.alertCtrl.create({
      title: 'Ajout List',
      message: "Donnez un nom à la liste",
      inputs: [
        {
          name: 'nom',
          placeholder: 'Nom'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.database.addTodoList(data.nom);
          }
        }
      ]
    });
    prompt.present();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad TodosPage');
  }

}
