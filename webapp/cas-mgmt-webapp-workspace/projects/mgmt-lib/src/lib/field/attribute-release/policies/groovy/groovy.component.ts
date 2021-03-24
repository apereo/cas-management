import {Component, Input} from '@angular/core';
import {GroovyReleaseForm} from '@apereo/mgmt-lib/src/lib/form';

/**
 * Component to display Groovy Attribute Release policy.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-groovy',
  templateUrl: './groovy.component.html'
})
export class GroovyComponent {

  @Input()
  form: GroovyReleaseForm;

  constructor() {
  }

}
