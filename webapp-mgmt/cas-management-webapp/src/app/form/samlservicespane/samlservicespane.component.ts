import {Component, OnInit} from '@angular/core';
import {Messages} from '../../messages';
import {SamlRegisteredService} from '../../../domain/saml-service';
import {Data} from '../data';
import {Util} from '../../util/util';
import {Row, RowDataSource} from '../row';

@Component({
  selector: 'app-samlservicespane',
  templateUrl: './samlservicespane.component.html',
  styleUrls: ['./samlservicespane.component.css']
})
export class SamlservicespaneComponent implements OnInit {

  displayedColumns = ['source', 'mapped', 'delete'];
  dataSource: RowDataSource;

  type: String;

  service: SamlRegisteredService;
  constructor(public messages: Messages,
              public data: Data) {
    this.service = data.service as SamlRegisteredService;
  }

  ngOnInit() {
    const rows = [];
    if (Util.isEmpty(this.service.attributeNameFormats)) {
      this.service.attributeNameFormats = new Map();
    }
    for (const p of Array.from(Object.keys(this.service.attributeNameFormats))) {
      rows.push(new Row(p));
    }
    this.dataSource = new RowDataSource(rows);
  }

  addRow() {
    this.dataSource.addRow();
  }

  doChange(row: Row, val: string) {
    this.service.attributeNameFormats[val] = this.service.attributeNameFormats[row.key as string];
    delete this.service.attributeNameFormats[row.key as string];
    row.key = val;
  }

  delete(row: Row) {
    delete this.service.attributeNameFormats[row.key as string];
    this.dataSource.removeRow(row);
  }
}

