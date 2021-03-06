import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { WeatherServiceProvider } from '../providers/weather-service/weather-service';
import { GeocodeServiceProvider } from '../providers/geocode-service/geocode-service';
import { LocationsServiceProvider } from '../providers/locations-service/locations-service';
import { LocationsPage } from '../pages/locations/locations';
import { WeatherPage } from '../pages/weather/weather';
import { Geolocation } from '@ionic-native/geolocation';
import { WeathericonPipe } from '../pipes/weathericon/weathericon';

@NgModule({
  declarations: [
    MyApp,
    LocationsPage,
    WeatherPage,
    WeathericonPipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LocationsPage,
    WeatherPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    WeatherServiceProvider,
    GeocodeServiceProvider,
    Geolocation,
    LocationsServiceProvider
  ]
})
export class AppModule { }
