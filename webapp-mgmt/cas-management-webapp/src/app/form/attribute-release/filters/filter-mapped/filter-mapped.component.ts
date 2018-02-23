import {Component, Input, OnInit} from '@angular/core';
import {RegisteredServiceMappedRegexAttributeFilter} from '../../../../../domain/attribute-filter';
import {Data} from '../../../data';
import {Messages} from '../../../../messages';
import {Row, RowDataSource} from '../../../row';

@Component({
  selector: 'app-filter-mapped',
  templateUrl: './filter-mapped.component.html',
  styleUrls: ['./filter-mapped.component.css']
})
export class FilterMappedComponent implements OnInit {
  displayedColumns = ['source', 'mapped', 'delete'];
  dataSource: RowDataSource;
  formData;

  @Input('filter')
  filter: RegisteredServiceMappedRegexAttributeFilter;

  constructor(public messages: Messages,
              public data: Data) {
    this.formData = data.formData;
  }

  ngOnInit() {
    const rows = [];
    if (this.filter.patterns) {
        for (const p of Array.from(Object.keys(this.filter.patterns))) {
            rows.push(new Row(p));
        }
    }
    this.dataSource = new RowDataSource(rows);
  }

  addRow() {
    this.dataSource.addRow();
  }

  doChange(row: Row, val: string) {
    this.filter.patterns[val] = this.filter.patterns[row.key as string];
    delete this.filter.patterns[row.key as string];
    row.key = val;
  }

  delete(row: Row) {
    delete this.filter.patterns[row.key as string];
    this.dataSource.removeRow(row);
  }

}
