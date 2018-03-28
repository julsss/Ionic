import { Component} from '@angular/core';
import {NavController, NavParams, Platform} from 'ionic-angular';
import { GoogleMap, GoogleMapsEvent } from '@ionic-native/google-maps';
import {TodoItem} from "../../model/todoItem";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

 /* @ViewChild('map') mapElement: ElementRef;
  map: any; */


  map: GoogleMap;
  items: TodoItem[];
  todoItems: Observable<TodoItem[]>;



  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform) {
    this.todoItems = this.navParams.get('item');
    this.todoItems.subscribe(items =>
      this.items = items
    );
  }


  ionViewDidLoad(){
    setTimeout(this.loadMap.bind(this), 1000);
    }

  loadMap(){

      //let location = new LatLng(this.item.lat,this.item.lng);

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
            lat: this.items[0].lat,
            lng: this.items[0].lng
          },
          'tilt': 30,
          'zoom': 15,
          'bearing': 50
        }
      });

      this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
        console.log('Map is ready!');
        for(var i=0;i<this.items.length;i++) {
          this.map.addMarker({
            title: this.items[i].name,
            icon: 'red',
            animation: 'DROP',
            position: {
              lat: this.items[i].lat,
              lng: this.items[i].lng
            }
          })
        }
      });
  }
}
