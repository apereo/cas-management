/**
 * Created by tsschmi on 4/25/17.
 */

import {HttpClient} from '@angular/common/http';

export abstract class Service {

  constructor(protected http: HttpClient) {

  }

  post<T>(url: string , data: any): Promise<T> {
    return this.http.post<T>(url, data)
      .toPromise()
      .then(resp => resp)
      .catch(this.handleError);
  }

  postText(url: string , data: any): Promise<String> {
    return this.http.post(url, data, {responseType: 'text'})
      .toPromise()
      .then(resp => resp)
      .catch(this.handleError);
  }

  get<T>(url: string): Promise<T> {
    return this.http.get(url)
      .toPromise()
      .then(resp => resp)
      .catch(this.handleError);
  }

  getText(url: string): Promise<String> {
    return this.http.get(url, {responseType: 'text'})
      .toPromise()
      .then(resp => resp)
      .catch(this.handleError);
  }

  handleError(e: any): Promise<any> {
    console.log('An error Occurred: ' + e);
    return Promise.reject(e.message || e);
  }
}

