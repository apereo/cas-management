import {Component, OnInit} from '@angular/core';
import {Util} from '../../util';
import {DefaultRegisteredServiceProperty} from '../../domain/property';
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
  properties: Map<String, DefaultRegisteredServiceProperty>;
  original: Map<String, DefaultRegisteredServiceProperty>;

  constructor(public data: DataRecord) {
    this.formData = data.formData;
    this.properties = data.service.properties;
    this.original = data.original && data.original.properties;
  }

  ngOnInit() {
    const rows: Row[] = [];
    if (Util.isEmpty(this.properties)) {
      this.properties = new Map();
    }
    for (const p of Array.from(Object.keys(this.properties))) {
      rows.push(new Row(p, this.properties.get(p).values.toString()));
    }
    this.dataSource = new RowDataSource();
    this.dataSource.data = rows;
  }

  addRow() {
    this.dataSource.addRow();
  }

  delete(row: Row) {
    this.dataSource.removeRow(row);
  }

}
