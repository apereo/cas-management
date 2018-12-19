import {Component, OnInit} from '@angular/core';
import {
  DataRecord,
  FormDataService,
} from 'mgmt-lib';
import {StrategyAccessForm} from './access-strategy-form';

@Component({
  selector: 'app-tab-accessstrategy',
  templateUrl: './tab-accessstrategy.component.html'
})
export class TabAccessstrategyComponent implements OnInit {

  groovyAccessStrategy: boolean;

  accessStrategy: StrategyAccessForm;

  constructor(public data: DataRecord,
              public formData: FormDataService) {
  }

  ngOnInit() {
    if (this.data.formMap.has('accessstrategy')) {
      this.accessStrategy = this.data.formMap.get('accessstrategy') as StrategyAccessForm;
      return;
    }
    this.accessStrategy = new StrategyAccessForm(this.data.service.accessStrategy);
    this.data.formMap.set('accessstrategy', this.accessStrategy);
  }

}
