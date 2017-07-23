import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LocationsPage } from '../pages/locations/locations';
import { WeatherPage } from '../pages/weather/weather';

import { CurrentLoc } from './interfaces/current-loc';

import { LocationsServiceProvider } from '../providers/locations-service/locations-service'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = WeatherPage;

  pages: Array<{title: string, component: any, icon: string, loc?: CurrentLoc}>;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public locationsService: LocationsServiceProvider,
    public events: Events
  ) {
 
    this.initializeApp();
    this.getMyLocations();
    events.subscribe('locations:updated', () => this.getMyLocations());
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  getMyLocations() {
    this.locationsService.getLocations().then(locations => {
      this.pages = [
        { title: 'Edit Locations', component: LocationsPage, icon: 'create' },
        { title: 'Current Location', component: WeatherPage, icon: 'pin' }
      ].concat(locations);
    })
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if (page.hasOwnProperty('loc')) {
      this.nav.setRoot(page.component, {geoloc: page.loc, title: page.title});
    } else {
      this.nav.setRoot(page.component, {title: page.title});
    }    
  }
}
