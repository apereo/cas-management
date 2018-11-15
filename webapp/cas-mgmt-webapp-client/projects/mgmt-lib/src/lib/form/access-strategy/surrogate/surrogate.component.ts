import { Component, OnInit } from '@angular/core';
import {SurrogateRegisteredServiceAccessStrategy} from '../../../domain/access-strategy';
import {DataRecord} from '../../data';
import {Util} from '../../../util';
import {Row, RowDataSource} from '../../row';
import {MgmtFormControl} from '../../mgmt-formcontrol';

@Component({
  selector: 'lib-surrogate',
  templateUrl: './surrogate.component.html',
  styleUrls: ['./surrogate.component.css']
})
export class SurrogateComponent implements OnInit {

  accessStrategy: SurrogateRegisteredServiceAccessStrategy;
  original: SurrogateRegisteredServiceAccessStrategy;

  displayedColumns = ['source', 'mapped', 'delete'];
  dataSource: RowDataSource;

  surrogateEnabled: MgmtFormControl;

  constructor(public data: DataRecord) {
    this.accessStrategy = data.service.accessStrategy as SurrogateRegisteredServiceAccessStrategy;
    this.original = data.original && data.original.accessStrategy as SurrogateRegisteredServiceAccessStrategy;
  }

  ngOnInit() {
    this.surrogateEnabled = new MgmtFormControl(this.accessStrategy.surrogateEnabled, this.original.surrogateEnabled);

    const rows = [];
    if (Util.isEmpty(this.accessStrategy.surrogateRequiredAttributes)) {
      this.accessStrategy.surrogateRequiredAttributes = new Map();
    }
    for (const p of Array.from(Object.keys(this.accessStrategy.surrogateRequiredAttributes))) {
      rows.push(new Row(p));
    }
    this.dataSource = new RowDataSource(rows);
  }

  addRow() {
    this.dataSource.addRow();
  }

  doChange(row: Row, val: string) {
    this.accessStrategy.surrogateRequiredAttributes[val] = this.accessStrategy.surrogateRequiredAttributes[row.key as string];
    delete this.accessStrategy.surrogateRequiredAttributes[row.key as string];
    row.key = val;
  }

  delete(row: Row) {
    delete this.accessStrategy.surrogateRequiredAttributes[row.key as string];
    this.dataSource.removeRow(row);
  }
}

