import {Component, OnInit} from '@angular/core';
import {FormData} from '../../domain/form-data';
import {
    DefaultRegisteredServiceMultifactorPolicy,
    GroovyRegisteredServiceMultifactorPolicy
} from '../../domain/multifactor';
import {DataRecord} from '../data';

enum Type {
  DEFAULT,
  GROOVY
}

@Component({
  selector: 'lib-mfa',
  templateUrl: './mfa.component.html'
})
export class MfaComponent implements OnInit {
  formData: FormData;
  type: Type;
  TYPE = Type;
  types = [Type.DEFAULT, Type.GROOVY];
  display = ['Default', 'Groovy Script'];

  constructor(public data: DataRecord) {
    this.formData = data.formData;
  }

  ngOnInit() {
    if (DefaultRegisteredServiceMultifactorPolicy.instanceOf(this.data.service.multifactorPolicy)) {
      this.type = Type.DEFAULT;
    } else if (GroovyRegisteredServiceMultifactorPolicy.instanceOf(this.data.service.multifactorPolicy)) {
      this.type = Type.GROOVY;
    }
  }

  changeType() {
    switch (+this.type) {
      case Type.DEFAULT :
        this.data.service.multifactorPolicy = new DefaultRegisteredServiceMultifactorPolicy();
        break;
      case Type.GROOVY :
        this.data.service.multifactorPolicy = new GroovyRegisteredServiceMultifactorPolicy();
        break;
    }
  }

}
