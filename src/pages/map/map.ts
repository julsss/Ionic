import { Component} from '@angular/core';
import {NavController, NavParams, Platform} from 'ionic-angular';
import { GoogleMap, GoogleMapsEvent, LatLng } from '@ionic-native/google-maps';
import {TodoItem} from "../../model/todoItem";

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

 /* @ViewChild('map') mapElement: ElementRef;
  map: any; */


  map: GoogleMap;
  item: TodoItem;



  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform) {
    this.item = this.navParams.get('item');
  }


  ionViewDidLoad(){
    setTimeout(this.loadMap.bind(this), 1000);
    }

  loadMap(){

      let location = new LatLng(this.item.lat,this.item.lng);

      this.map = new GoogleMap('map', {
        'backgroundColor': 'white',
        'controls': {
          'compass': true,
          'myLocationButton': true,
          'indoorPicker': true,
          'zoom': true
        },
        'gestures': {
          'scroll': true,
          'tilt': true,
          'rotate': true,
          'zoom': true
        },
        'camera': {
          target: {
            lat: location.lat,
            lng: location.lng
          },
          'tilt': 30,
          'zoom': 15,
          'bearing': 50
        }
      });

      this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
        console.log('Map is ready!');
        this.map.addMarker({
          title: 'Ionic',
          icon: 'red',
          animation: 'DROP',
          position: {
            lat: this.item.lat,
            lng: this.item.lng
          }
        })
          .then(marker => {
            marker.on(GoogleMapsEvent.MARKER_CLICK)
              .subscribe(() => {
                alert('clicked');
              });
          });
      });
  }
}
