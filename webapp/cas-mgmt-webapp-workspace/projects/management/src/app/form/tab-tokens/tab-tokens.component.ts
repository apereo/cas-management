import {Component, OnInit} from '@angular/core';
import {OAuthRegisteredService} from 'domain-lib';
import {TabTokenForm} from './tab-tokens.form';
import {DataRecord} from 'mgmt-lib';

@Component({
  selector: 'app-tab-tokens',
  templateUrl: './tab-tokens.component.html',
  styleUrls: ['./tab-tokens.component.css']
})
export class TabTokensComponent implements OnInit {

  form: TabTokenForm;
  readonly key = 'tokens';

  constructor(public data: DataRecord) {
    if (this.data.formMap.has(this.key)) {
      this.form = this.data.formMap.get(this.key) as TabTokenForm;
    } else {
      this.form = new TabTokenForm(this.data.service as OAuthRegisteredService);
      this.data.formMap.set(this.key, this.form);
    }
  }

  ngOnInit() {

  }
}
