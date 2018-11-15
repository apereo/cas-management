import { Component, OnInit } from '@angular/core';
import {DataRecord} from '../../data';
import {FormData} from '../../../domain/form-data';
import {
  GroovySurrogateRegisteredServiceAccessStrategy
} from '../../../domain/access-strategy';
import {MgmtFormControl} from '../../mgmt-formcontrol';

@Component({
  selector: 'lib-groovy-surrogate',
  templateUrl: './groovy-surrogate.component.html',
  styleUrls: ['./groovy-surrogate.component.css']
})
export class GroovySurrogateComponent implements OnInit {

  formData: FormData;
  accessStrategy: GroovySurrogateRegisteredServiceAccessStrategy;
  original: GroovySurrogateRegisteredServiceAccessStrategy;
  script: MgmtFormControl;

  constructor(public data: DataRecord) {
    this.formData = data.formData;
    this.accessStrategy = data.service.accessStrategy as GroovySurrogateRegisteredServiceAccessStrategy;
    this.original = data.original && data.original.accessStrategy as GroovySurrogateRegisteredServiceAccessStrategy;
  }

  ngOnInit() {
    this.script = new MgmtFormControl(this.accessStrategy.groovyScript, this.original.groovyScript);
  }

}
