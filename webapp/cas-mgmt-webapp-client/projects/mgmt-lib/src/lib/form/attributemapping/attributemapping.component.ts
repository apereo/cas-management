import {Component, OnInit, Input} from '@angular/core';
import {Row, RowDataSource} from '../row';
import {DataRecord} from '../data';

@Component({
  selector: 'lib-attributemapping',
  templateUrl: './attributemapping.component.html',
  styleUrls: ['./attributemapping.component.css']
})
export class AttributemappingComponent implements OnInit {

  displayedColumns = ['source', 'mapped', 'delete'];
  dataSource: RowDataSource;

  @Input()
  attributes: Map<String, String>;

  @Input()
  attributeNames: String[];

  selectedRow;

  constructor(public data: DataRecord) {
  }

  ngOnInit() {
    const rows = [];
    for (const p of Array.from(Object.keys(this.attributes))) {
      rows.push(new Row(p, this.attributes.get(p)));
    }
    this.dataSource = new RowDataSource(rows);
  }

  addRow() {
    this.dataSource.addRow();
  }

  delete(row: Row) {
    this.dataSource.removeRow(row);
  }

}
