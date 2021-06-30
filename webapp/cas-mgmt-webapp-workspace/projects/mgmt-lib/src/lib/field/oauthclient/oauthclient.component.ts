import {Component, EventEmitter, Input, Output} from '@angular/core';
import {OauthClientForm} from '@apereo/mgmt-lib/src/lib/form';
import {AppConfigService} from '@apereo/mgmt-lib/src/lib/ui';

/**
 * Component for displaying information for an OAuthClient.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-oauthclient',
  templateUrl: './oauthclient.component.html',
  styleUrls: ['./oauthclient.component.css']
})
export class OauthclientComponent {

  @Input()
  form: OauthClientForm;

  @Output()
  generateId: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  generateSecret: EventEmitter<void> = new EventEmitter<void>();

  constructor(public config: AppConfigService) {
  }

}
