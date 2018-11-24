import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormData} from '../../../domain/form-data';
import {
  DefaultRegisteredServiceAccessStrategy,
  GroovyRegisteredServiceAccessStrategy,
  GroovySurrogateRegisteredServiceAccessStrategy,
  GrouperRegisteredServiceAccessStrategy,
  RegisteredServiceAccessStrategy,
  RemoteEndpointServiceAccessStrategy,
  SurrogateRegisteredServiceAccessStrategy,
  TimeBasedRegisteredServiceAccessStrategy
} from '../../../domain/access-strategy';
import {DataRecord} from '../../data';

enum Type {
  DEFAULT, TIME, GROUPER, REMOTE, SURROGATE, GROOVY_SURROGATE, GROOVY
}

@Component({
  selector: 'lib-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.css']
})
export class TypeComponent implements OnInit {

  @Input()
  data: RegisteredServiceAccessStrategy[];

  type: Type;
  TYPE = Type;
  types = [Type.DEFAULT, Type.TIME, Type.GROUPER, Type.REMOTE, Type.SURROGATE, Type.GROOVY_SURROGATE, Type.GROOVY];

  formData: FormData;

  @Output()
  typeChange: EventEmitter<void> = new EventEmitter<void>();

  constructor(public data: DataRecord) {
    this.formData = data.formData;
  }

  ngOnInit() {
    const service = this.data[0];

    if (RemoteEndpointServiceAccessStrategy.instanceOf(service.accessStrategy)) {
      this.type = Type.REMOTE;
    } else if (TimeBasedRegisteredServiceAccessStrategy.instanceOf(service.accessStrategy)) {
      this.type = Type.TIME;
    } else if (GrouperRegisteredServiceAccessStrategy.instanceOf(service.accessStrategy)) {
      this.type = Type.GROUPER;
    } else if (SurrogateRegisteredServiceAccessStrategy.instanceOf(service.accessStrategy)) {
      this.type = Type.SURROGATE;
    } else if (GroovyRegisteredServiceAccessStrategy.instanceOf(service.accessStrategy)) {
      this.type = Type.GROOVY;
    } else if (GroovySurrogateRegisteredServiceAccessStrategy.instanceOf(service.accessStrategy)) {
      this.type = Type.GROOVY_SURROGATE;
    } else {
      this.type = Type.DEFAULT;
    }
  }

  changeType() {
    switch (+this.type) {
      case Type.DEFAULT :
        this.data.service.accessStrategy = new DefaultRegisteredServiceAccessStrategy(this.data.service.accessStrategy);
        break;
      case Type.REMOTE :
        this.data.service.accessStrategy = new RemoteEndpointServiceAccessStrategy(this.data.service.accessStrategy);
        break;
      case Type.TIME :
        this.data.service.accessStrategy = new TimeBasedRegisteredServiceAccessStrategy(this.data.service.accessStrategy);
        break;
      case Type.GROUPER :
        this.data.service.accessStrategy = new GrouperRegisteredServiceAccessStrategy(this.data.service.accessStrategy);
        break;
      case Type.SURROGATE :
        this.data.service.accessStrategy = new SurrogateRegisteredServiceAccessStrategy(this.data.service.accessStrategy);
        break;
      case Type.GROOVY :
        this.data.service.accessStrategy = new GroovyRegisteredServiceAccessStrategy(this.data.service.accessStrategy);
        break;
      case Type.GROOVY_SURROGATE :
        this.data.service.accessStrategy = new GroovySurrogateRegisteredServiceAccessStrategy(this.data.service.accessStrategy);
        break;
      default:
    }
    this.typeChange.emit();
  }

}
