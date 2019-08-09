import {FormArray, FormGroup, Validators} from '@angular/forms';
import {MgmtFormControl} from 'mgmt-lib';

export class AttributeForm extends FormArray {

  map: Map<string, string[] | string>;

  constructor(map?: Map<string, string[] | string>) {
    super([]);
    if (map) {
      this.map = map;
      for (let i = 0; i < Object.keys(map).length; i++) {
        this.push(new FormGroup({
          key: new MgmtFormControl(null, null, Validators.required),
          value: new MgmtFormControl(null, null, Validators.required)
        }));
      }
    }
  }

  formMap(): any {
    const frm = [];
    if (this.map) {
      for (const a of Array.from(Object.keys(this.map))) {
        frm.push({
          key: a,
          value: this.map[a].toString()
        });
      }
    }
    return frm;
  }

  mapForm(): Map<string, string[]> {
    if (this.length > 0) {
      const map = new Map<string, string[]>();
      for (const c of this.value) {
        map[c.key] = c.value.split(',');
      }
      return map;
    }
    return null;
  }

  mapFormString(): Map<string, string> {
    if (this.length > 0) {
      const map = new Map<string, string>();
      for (const c of this.value) {
        map[c.key] = c.value;
      }
      return map;
    }
    return null;
  }
}
