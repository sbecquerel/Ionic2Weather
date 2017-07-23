import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Refresher } from 'ionic-angular';
import { WeatherServiceProvider } from '../../providers/weather-service/weather-service';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, 
              public weatherService: WeatherServiceProvider, public loadingCtrl: LoadingController) {
    let loader = this.loadingCtrl.create({
      content: 'Loading weather data...',
      duration: 3000
    });
    loader.present();

    weatherService.getWeather().then(data => {
      this.theWeather = data;
      this.currentData = this.theWeather.currently;
      this.daily = this.theWeather.daily;      
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WeatherPage');
  }

  doRefresh(refresher) {
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }
}
