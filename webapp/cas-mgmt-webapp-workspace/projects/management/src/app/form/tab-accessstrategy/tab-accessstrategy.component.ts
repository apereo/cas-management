import {Component, OnInit} from '@angular/core';
import {
  DataRecord,
  FormDataService,
} from 'mgmt-lib';
import {TabAccessStrategyForm} from './tab-access-strategy-form';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-tab-accessstrategy',
  templateUrl: './tab-accessstrategy.component.html'
})
export class TabAccessstrategyComponent implements OnInit {

  groovyAccessStrategy: boolean;

  form: TabAccessStrategyForm;
  readonly key = 'accessStrategy';

  constructor(public data: DataRecord,
              public formData: FormDataService,
              public route: ActivatedRoute) {
  }

  ngOnInit() {
    if (this.data.formMap.has(this.key)) {
      this.form = this.data.formMap.get(this.key) as TabAccessStrategyForm;
      return;
    }
    this.form = new TabAccessStrategyForm(this.data.service.accessStrategy);
    this.data.formMap.set(this.key, this.form);
  }

  availableAttributes() {
    const repos = this.data.service.attributeReleasePolicy.principalAttributesRepository.attributeRepositoryIds;
    return this.formData.availableAttributes(repos);
  }
}
