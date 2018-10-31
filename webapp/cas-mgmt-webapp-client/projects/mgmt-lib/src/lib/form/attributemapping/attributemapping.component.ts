import {Component, OnInit, Input} from '@angular/core';
import {Row, RowDataSource} from '../row';
import {MatAutocompleteSelectedEvent} from '@angular/material';
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
  attributes: Map<String, String[]>;

  @Input()
  attributeNames: String[];

  selectedRow;

  constructor(public data: DataRecord) {
  }

  ngOnInit() {
    const rows = [];
    for (const p of Array.from(Object.keys(this.attributes))) {
      rows.push(new Row(p));
    }
    this.dataSource = new RowDataSource(rows);
  }

  addRow() {
    this.dataSource.addRow();
  }

  doChange(row: Row, val: string) {
    this.attributes[val] = this.attributes[row.key as string];
    delete this.attributes[row.key as string];
    row.key = val;
  }

  delete(row: Row) {
    delete this.attributes[row.key as string];
    this.dataSource.removeRow(row);
  }

  selection(val: MatAutocompleteSelectedEvent) {
    const opt =  val.option.value;
    this.doChange(this.selectedRow, opt)
  }
}
