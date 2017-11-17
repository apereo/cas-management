/**
 * Created by tschmidt on 2/14/17.
 */
import {Headers} from '@angular/http'
import {Injectable} from '@angular/core';
import {AbstractRegisteredService} from '../../domain/registered-service';
import {FormData} from '../../domain/form-data';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class FormService {

  constructor(private http: HttpClient) {}

  getService(id: string): Promise<AbstractRegisteredService> {
    return this.http.get<AbstractRegisteredService>('getService?id=' + id)
      .toPromise()
      .then(resp => {
        const as: AbstractRegisteredService = resp as AbstractRegisteredService;
        return as;
      })
      .catch(this.handleError)
  }

  saveService(service: AbstractRegisteredService): Promise<number> {
    return this.http
      .post('saveService', service)
      .toPromise()
      .then(resp => resp)
      .catch(this.handleError)
  }


  formData(): Promise<FormData> {
    return this.http.get<FormData>('formData')
      .toPromise()
      .then(resp => resp)
      .catch(this.handleError);
  }

  handleError(e: any): Promise<any> {
    console.log('An error occurred : ' + e);
    return Promise.reject(e.message || e);
  }

}
