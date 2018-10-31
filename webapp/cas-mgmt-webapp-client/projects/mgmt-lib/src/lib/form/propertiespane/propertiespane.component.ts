import {Component, OnInit} from '@angular/core';
import {Util} from '../../util';
import {DefaultRegisteredServiceProperty} from '../../domain/property';
import {MatAutocompleteSelectedEvent} from '@angular/material';
import {FormData} from '../../domain/form-data';
import {Row, RowDataSource} from '../row';
import {DataRecord} from '../data';

@Component({
  selector: 'lib-propertiespane',
  templateUrl: './propertiespane.component.html',
  styleUrls: ['./propertiespane.component.css']
})
export class PropertiespaneComponent implements OnInit {
  displayedColumns = ['source', 'mapped', 'delete'];
  dataSource: RowDataSource;
  selectedRow: Row;
  formData: FormData;

  constructor(public data: DataRecord) {
    this.formData = data.formData;
  }

  ngOnInit() {
    const rows = [];
    if (Util.isEmpty(this.data.service.properties)) {
      this.data.service.properties = new Map();
    }
    for (const p of Array.from(Object.keys(this.data.service.properties))) {
      rows.push(new Row(p));
    }
    this.dataSource = new RowDataSource(rows);
  }

  addRow() {
    this.dataSource.addRow();
  }

  doChange(row: Row, val: string) {
    if (Object.keys(this.data.service.properties).indexOf(row.key as string) > -1) {
      this.data.service.properties[val] = this.data.service.properties[row.key as string];
      delete this.data.service.properties[row.key as string];
    } else {
      this.data.service.properties[val] = new DefaultRegisteredServiceProperty();
    }
    row.key = val;
  }

  delete(row: Row) {
    delete this.data.service.properties[row.key as string];
    this.dataSource.removeRow(row);
  }

  selection(val: MatAutocompleteSelectedEvent) {
    const opt =  val.option.value;
    this.doChange(this.selectedRow, opt.propertyName);
    if (val) {
      this.data.service.properties[opt.propertyName].values = [opt.defaultValue];
    }
  }
}
