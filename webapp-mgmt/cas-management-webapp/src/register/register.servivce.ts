import {Service} from '../app/service';
import {Injectable} from '@angular/core';
import {AbstractRegisteredService} from '../domain/registered-service';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class RegisterService extends Service {

  constructor(public http: HttpClient) {
    super(http);
  }

  submitService(service: AbstractRegisteredService): Promise<String> {
    return this.postText('submit',service);
  }

  save(service: AbstractRegisteredService): Promise<String> {
    return this.postText('registerSave', service);
  }
}