import {Component, OnInit} from '@angular/core';
import {SamlRegisteredService} from '../../domain/saml-service';
import {Util} from '../../util';
import {Row, RowDataSource} from '../row';
import {DataRecord} from '../data';

@Component({
  selector: 'lib-samlservicespane',
  templateUrl: './samlservicespane.component.html',
  styleUrls: ['./samlservicespane.component.css']
})
export class SamlservicespaneComponent implements OnInit {

  displayedColumns = ['source', 'mapped', 'delete'];
  dataSource: RowDataSource;

  type: String;

  service: SamlRegisteredService;
  original: SamlRegisteredService;

  constructor(public data: DataRecord) {
    this.service = data.service as SamlRegisteredService;
    this.original = data.original && data.original as SamlRegisteredService;
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

