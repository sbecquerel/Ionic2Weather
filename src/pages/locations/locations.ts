import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Events } from 'ionic-angular';
import { WeatherLocation } from '../../app/interfaces/weather-location';
import { LocationsServiceProvider } from '../../providers/locations-service/locations-service';
import { GeocodeServiceProvider } from '../../providers/geocode-service/geocode-service';
import { WeatherPage } from '../../pages/weather/weather';

/**
 * Generated class for the LocationsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-locations',
  templateUrl: 'locations.html',
})
export class LocationsPage {

  locs: Array<WeatherLocation>;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public locationsService: LocationsServiceProvider,
    public geocodeService: GeocodeServiceProvider,
    public alertCtrl: AlertController,
    public events: Events
  ) {
    
    locationsService.getLocations().then(locs => this.locs = locs);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationsPage');
  }

  deleteLocation(loc) {
    this.locationsService.removeLocation(loc);
    this.events.publish('locations:updated', {});
  }

  addLocation() {
    let prompt = this.alertCtrl.create({
      title: 'Add a city',
      message: "Enter the city's name",
      inputs: [{
        name: 'title',
        placeholder: 'City name'
      }],
      buttons: [{
        text: 'Cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      }, {
        text: 'Add',
        handler: data => {
          const title = data.title.trim();
          if (title !== '') {
            this.geocodeService.getLatLong(title).then(res => {
              console.log('Add location: ', res);
              this.locationsService.addLocation({
                title: res.name,
                component: WeatherPage,
                icon: 'pin',
                loc: {
                  lat: res.location.latitude,
                  lon: res.location.longitude
                }
              });
              this.events.publish('locations:updated', {});
            })
          }
        }
      }]
    });

    prompt.present();
    //this.geocodeService.getLatLong();
  }
}
