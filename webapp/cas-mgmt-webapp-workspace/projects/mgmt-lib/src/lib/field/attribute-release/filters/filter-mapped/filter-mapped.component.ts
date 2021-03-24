import {Component, Input} from '@angular/core';
import {FilterMappedRegExForm} from '@apereo/mgmt-lib/src/lib/form';
import {AppConfigService} from '@apereo/mgmt-lib/src/lib/ui';

/**
 * Component for display Mapped Filters for a service.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-filter-mapped',
  templateUrl: './filter-mapped.component.html',
  styleUrls: ['./filter-mapped.component.css']
})
export class FilterMappedComponent {

  @Input()
  form: FilterMappedRegExForm;

  @Input()
  attributes: string[];

  constructor(public config: AppConfigService) {
  }

}
