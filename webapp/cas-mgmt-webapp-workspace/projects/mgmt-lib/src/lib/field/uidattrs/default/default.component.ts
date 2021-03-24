import {Component, Input, OnInit} from '@angular/core';
import {AppConfigService} from '@apereo/mgmt-lib/src/lib/ui';
import {UidattrsForm} from '@apereo/mgmt-lib/src/lib/form';

@Component({
  selector: 'lib-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {

  @Input()
  form: UidattrsForm;

  constructor(public config: AppConfigService) { }

  ngOnInit(): void {
  }

}
