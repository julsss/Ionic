import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ModalQrcodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-qrcode',
  templateUrl: 'modal-qrcode.html',
})
export class ModalQrcodePage {

  createdCode = null;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.createdCode = this.navParams.get('uuidlist');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalQrcodePage');
  }

  createCode() {
    this.navCtrl.pop();
  }

}
