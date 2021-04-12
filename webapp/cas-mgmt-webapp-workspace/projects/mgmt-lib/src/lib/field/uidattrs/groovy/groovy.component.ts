import {Component, Input} from '@angular/core';
import {GroovyUidForm} from '@apereo/mgmt-lib/src/lib/form';

/**
 * Component to display/update groovy uid attributes.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-groovy',
  templateUrl: './groovy.component.html'
})
export class GroovyComponent {

  @Input()
  form: GroovyUidForm;

}
