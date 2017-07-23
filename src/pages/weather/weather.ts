import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Refresher } from 'ionic-angular';
import { WeatherServiceProvider } from '../../providers/weather-service/weather-service';
import { Geolocation } from '@ionic-native/geolocation';
import { CurrentLoc } from '../../app/interfaces/current-loc';

/**
 * Generated class for the WeatherPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-weather',
  templateUrl: 'weather.html',
})
export class WeatherPage {

  theWeather: any = {};
  currentData: any = {};
  daily: any = {};
  loader: LoadingController;
  refresher: Refresher;
  currentLoc: CurrentLoc = {lat: 0, lon: 0};
  pageTitle: string = 'Current location';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public weatherService: WeatherServiceProvider, 
    public loadingCtrl: LoadingController,
    public geolocation: Geolocation
  ) {
    let loader = this.loadingCtrl.create({
      content: 'Loading weather data...'
    });
    loader.present();

    let loc = navParams.get('geoloc');
    
    if (navParams.get('title') !== undefined) {
      this.pageTitle = navParams.get('title');
    }
    
    if (loc == undefined) {
      geolocation.getCurrentPosition()
        .then(pos => {
          this.currentLoc.lat = pos.coords.latitude;
          this.currentLoc.lon = pos.coords.longitude;
          this.currentLoc.timestamp = pos.timestamp;
          return this.currentLoc
        })
        .then(currentLoc => {
          weatherService.getWeather(currentLoc).then(data => {
            this.theWeather = data;
            this.currentData = this.theWeather.currently;
            this.daily = this.theWeather.daily;      
            loader.dismiss();
          });
        });
    } else {
      this.currentLoc = loc;
      weatherService.getWeather(this.currentLoc).then(data => {
        this.theWeather = data;
        this.currentData = this.theWeather.currently;
        this.daily = this.theWeather.daily;      
        loader.dismiss();
      });
    }
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WeatherPage');
  }

  doRefresh(refresher) {
    this.weatherService.getWeather(this.currentLoc).then(data => {
      this.theWeather = data;
      this.currentData = this.theWeather.currently;
      this.daily = this.theWeather.daily;      
      refresher.complete();
    });
  }
}
