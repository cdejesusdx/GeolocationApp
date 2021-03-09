import { Component } from '@angular/core';
import { NavController} from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  // Datos del usuario:

  latitude:number; // latitud 
  longitude:number; // longitud

  constructor(public navController: NavController, public geolocation: Geolocation, public launchNavigator:LaunchNavigator) {
    this.getGeolocation();
  }
  
  // Obtener las coordenadas del usuario
  getGeolocation(){
    this.geolocation.getCurrentPosition().then(position =>{
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
      },error=>{
          console.log('error',error);
      });
  }

  // Navegar a una ubicación por GOOGLE MAPS. 
  // Esta ubicación se obtiene en base a la latitud y longitud de unas coordenadas.
  navigateLocation(){
    let options: LaunchNavigatorOptions = {
      start:[this.latitude,this.longitude],
      app: this.launchNavigator.APP.GOOGLE_MAPS
    };

    this.launchNavigator.navigate('Toronto, ON', options).then(success =>{
      console.log(success);
    },error=>{
      console.log(error);
    })
  }
}
