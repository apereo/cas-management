import {Component, Input} from '@angular/core';
import {FormControl} from '@angular/forms';

/**
 * Component to display/update service name in a service.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: "lib-servicename",
  templateUrl: "./servicename.component.html",
})
export class ServicenameComponent {
  pattern: RegExp = new RegExp(/[^<>:"/|\\?*]+$/y);

  @Input()
  control: FormControl;
}
