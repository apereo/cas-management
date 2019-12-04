import {FormArray, FormGroup, Validators} from '@angular/forms';
import {MgmtFormControl} from '../mgmt-formcontrol';

export class Row extends FormGroup {

  get key() { return this.get('key') as MgmtFormControl; }
  get values() { return this.get('values') as MgmtFormControl; }

  constructor(key: string = null, value: string = null) {
    super({
      key: new MgmtFormControl(key, null, Validators.required),
      values: new MgmtFormControl(value, null, Validators.required)
    });
  }

  map(): string[] {
    return this.values.value.split(',');
  }

}
export class AttributesForm extends FormArray {

  constructor(map?: Map<string, string[] | string>) {
    super([]);
    if (map) {
      Object.keys(map).forEach(k => this.createRow(k, map[k]));
    }
  }

  rows(): Row[] {
    return this.controls as Row[];
  }

  addRow(): Row {
    const row = new Row();
    this.push(row);
    return row;
  }

  createRow(key: string, values: string[]) {
    this.push(new Row(key, values.toString()));
  }

  rowAt(index: number): Row {
    return this.at(index) as Row;
  }

  mapForm(): Map<string, string[]> {
    const attributes = new Map<string, string[]>();
    this.rows().forEach(r => {
      attributes[r.key.value] = r.map();
    });
    return attributes;
  }

  mapFormString(): Map<string, string> {
    if (this.length > 0) {
      const map = new Map<string, string>();
      for (const c of this.rows()) {
        map[c.key.value] = c.values.value;
      }
      return map;
    }
    return null;
  }
}
