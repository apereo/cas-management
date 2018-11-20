import {Component, forwardRef, OnInit} from '@angular/core';
import {SurrogateRegisteredServiceAccessStrategy} from '../../../domain/access-strategy';
import {DataRecord} from '../../data';
import {Util} from '../../../util';
import {Row, RowDataSource} from '../../row';
import {MgmtFormControl} from '../../mgmt-formcontrol';
import {HasControls} from '../../has-controls';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'lib-surrogate',
  templateUrl: './surrogate.component.html',
  styleUrls: ['./surrogate.component.css'],
  providers: [{
    provide: HasControls,
    useExisting: forwardRef(() => SurrogateComponent)
  }]
})
export class SurrogateComponent extends HasControls implements OnInit {

  accessStrategy: SurrogateRegisteredServiceAccessStrategy;
  original: SurrogateRegisteredServiceAccessStrategy;

  displayedColumns = ['source', 'mapped', 'delete'];
  dataSource: RowDataSource;

  surrogateEnabled: MgmtFormControl;

  constructor(public data: DataRecord) {
    super();
    this.accessStrategy = data.service.accessStrategy as SurrogateRegisteredServiceAccessStrategy;
    this.original = data.original && data.original.accessStrategy as SurrogateRegisteredServiceAccessStrategy;
  }

  getControls(): Map<string, FormControl> {
    let c: Map<string, FormControl> = new Map();
    c.set('surrogateEnabled', this.surrogateEnabled);
    return c;
  }

  ngOnInit() {
    const og = this.original && this.original.surrogateEnabled;
    this.surrogateEnabled = new MgmtFormControl(this.accessStrategy.surrogateEnabled, og);

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

