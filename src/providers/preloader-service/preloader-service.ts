import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';

/*
  Generated class for the Preloader provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class PreloaderServiceProvider {

  private loading : any;

  constructor(public loadingCtrl : LoadingController)
  {
  }



  displayPreloader() : void
  {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    this.loading.present();
  }



  hidePreloader() : void
  {
    this.loading.dismiss();
  }

}
