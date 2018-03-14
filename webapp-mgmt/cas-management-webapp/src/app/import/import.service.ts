import {Service} from '../service';
import {Injectable} from '@angular/core';
import {AbstractRegisteredService, RegisteredService} from '../../domain/registered-service';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ImportService {

  service: AbstractRegisteredService;
  submissionFile: String;

  constructor(private http: HttpClient) {}

  import(file: String): Promise<AbstractRegisteredService> {
    return this.http.post<AbstractRegisteredService>('import', file)
      .toPromise()
      .then(resp => {
        this.service = resp;
        return resp;
      }).catch(this.handleError);
  }

  importSubmission(file: String): Promise<AbstractRegisteredService> {
    return this.http.get<AbstractRegisteredService>('importSubmission?id=' + file)
      .toPromise()
      .then(resp => {
        this.submissionFile = file;
        this.service = resp;
        return resp;
      }).catch(this.handleError);
  }

  handleError(e: any): Promise<any> {
    console.log('An error occurred : ' + e.message);
    return Promise.reject(e.message || e);
  }
}
