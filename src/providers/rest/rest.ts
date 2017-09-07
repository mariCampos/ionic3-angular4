import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class RestProvider {

  private apiUrl = 'https://restcountries.eu/rest/v2/all';

  constructor(public http: Http) {
    console.log('Hello RestProvider Provider');
  }

  //CRUD for application

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

  getCountries(): Observable<string[]>{
    return this.http.get(this.apiUrl)
      .map(this.extractData)
      .catch(this.handleError);
 }

 private handleError (error: Response | any) {
  let errMsg: string;
  if (error instanceof Response) {
    const body = error.json() || '';
    const err = body.error || JSON.stringify(body);
    errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
  } else {
    errMsg = error.message ? error.message : error.toString();
  }
  console.log(errMsg);
  return Observable.throw(errMsg);
 }
}
