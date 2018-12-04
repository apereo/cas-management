import {Component} from '@angular/core';
import {DataRecord} from 'mgmt-lib';
import {OauthForm} from './oauth-form';

@Component({
  selector: 'app-tab-oauth',
  templateUrl: './tab-oauth.component.html',
  styleUrls: ['./tab-oauth.component.css']
})
export class TabOauthComponent {

  oauth: OauthForm;

  constructor(public data: DataRecord) {
    if (this.data.formMap.has('oauth')) {
      this.oauth = this.data.formMap.get('oauth') as OauthForm;
      return;
    }
    this.oauth = new OauthForm(this.data);
    this.data.formMap.set('oauth', this.oauth);
  }
}
