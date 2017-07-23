import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the GeocodeServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class GeocodeServiceProvider {

  data: any;
  apiKey: string = 'AIzaSyDFwxLUilN3Ybv1HCGsQ0JWYEEmi2lCehg';

  constructor(public http: Http) {
    this.data = null;
  }

  getLatLong(address: string) {
    if (this.data) {
      return Promise.resolve(this.data);
    }
    return new Promise(resolve => {
      this.http
        .get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${this.apiKey}`)
        .map(res => res.json())
        .subscribe(data => {
          if (data.status === 'OK') {
            resolve({
              name: data.results[0].formatted_address, location: {
                latitude: data.results[0].geometry.location.lat,
                longitude: data.results[0].geometry.location.lng
              }
            });
          } else {
            console.log(data);
            //reject
          }
        })
    })
  }
}
