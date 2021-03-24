import {Component, Input} from '@angular/core';
import {RestfulReleseForm} from '@apereo/mgmt-lib/src/lib/form';

/**
 * Component to display Restful Attribute Release Policy.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-restful',
  templateUrl: './restful.component.html'
})
export class RestfulComponent {

  @Input()
  form: RestfulReleseForm;

  constructor() {
  }

}
