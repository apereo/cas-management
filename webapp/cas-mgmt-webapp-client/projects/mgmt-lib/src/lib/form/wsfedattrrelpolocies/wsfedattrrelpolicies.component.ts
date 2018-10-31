import {Component, OnInit} from '@angular/core';
import {FormData} from '../../domain/form-data';
import {WsFederationClaimsReleasePolicy} from '../../domain/attribute-release';
import {Util} from '../../util';
import {Row, RowDataSource} from '../row';
import {DataRecord} from '../data';


@Component({
  selector: 'lib-wsfedattrrelpolicies',
  templateUrl: './wsfedattrrelpolicies.component.html',
  styleUrls: ['./wsfedattrrelpolicies.component.css']
})
export class WsfedattrrelpoliciesComponent implements OnInit {

  formData: FormData;
  displayedColumns = ['source', 'mapped'];
  dataSource: RowDataSource;

  policy: WsFederationClaimsReleasePolicy;
  original: WsFederationClaimsReleasePolicy;

  constructor(public data: DataRecord) {
    this.formData = data.formData;
    this.policy = data.service.attributeReleasePolicy as WsFederationClaimsReleasePolicy;
    this.original = data.original && data.original.attributeReleasePolicy as WsFederationClaimsReleasePolicy;
  }

  ngOnInit() {
    const rows = [];
    if (Util.isEmpty(this.policy.allowedAttributes)) {
      this.policy.allowedAttributes = new Map();
    }

    this.formData.availableAttributes.forEach((k) => {
      this.policy.allowedAttributes[k as string] = k;
    });

    for (const key of Array.from(Object.keys(this.policy.allowedAttributes))) {
      rows.push(new Row(key as string));
    }
    this.dataSource = new RowDataSource(rows);
  }

  isEmpty(data: any[]): boolean {
    return !data || data.length === 0;
  }

}
