import {Component, Input} from '@angular/core';
import {AssertionForm} from '@apereo/mgmt-lib/src/lib/form';

/**
 * Component to display/update options for SAML Assertions.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-assertion',
  templateUrl: './assertion.component.html',
  styleUrls: ['./assertion.component.css']
})
export class AssertionComponent {

  @Input()
  form: AssertionForm;

}
