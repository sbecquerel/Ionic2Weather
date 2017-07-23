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

  constructor(public http: Http) {
    console.log('Hello GeocodeServiceProvider Provider');
  }

}
