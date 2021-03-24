import {Component, Input} from '@angular/core';
import {PrincipalRepoType} from '@apereo/mgmt-lib/src/lib/model';
import {CachingPrincipalRepoForm, PrincipalRepoForm} from '@apereo/mgmt-lib/src/lib/form';
import {FormControl} from '@angular/forms';
import {AppConfigService} from '@apereo/mgmt-lib/src/lib/ui';

/**
 * Component to display and allow Principal Attribute Repository selection.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-attribute-release-principal-repo',
  templateUrl: './principal-repo.component.html'
})
export class PrincipalRepoComponent {
  type: PrincipalRepoType;
  TYPE = PrincipalRepoType;

  @Input()
  form: PrincipalRepoForm;

  @Input()
  typeControl: FormControl;

  constructor(public config: AppConfigService) {
  }

  /**
   * Returns the caching form.
   */
  caching(): CachingPrincipalRepoForm {
    return this.form as CachingPrincipalRepoForm;
  }

}
