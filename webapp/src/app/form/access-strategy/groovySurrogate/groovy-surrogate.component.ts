import { Component, OnInit } from '@angular/core';
import {Messages} from '../../../messages';
import {Data} from '../../data';
import {FormData} from '../../../../domain/form-data';
import {
  GroovySurrogateRegisteredServiceAccessStrategy
} from '../../../../domain/access-strategy';

@Component({
  selector: 'app-groovy-surrogate',
  templateUrl: './groovy-surrogate.component.html',
  styleUrls: ['./groovy-surrogate.component.css']
})
export class GroovySurrogateComponent implements OnInit {

  formData: FormData;
  accessStrategy: GroovySurrogateRegisteredServiceAccessStrategy;
  original: GroovySurrogateRegisteredServiceAccessStrategy;

  constructor(public messages: Messages,
              public data: Data) {
    this.formData = data.formData;
    this.accessStrategy = data.service.accessStrategy as GroovySurrogateRegisteredServiceAccessStrategy;
    this.original = data.original && data.original.accessStrategy as GroovySurrogateRegisteredServiceAccessStrategy;
  }

  ngOnInit() {
  }

}
