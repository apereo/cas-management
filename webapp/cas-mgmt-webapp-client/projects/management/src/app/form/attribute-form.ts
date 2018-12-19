import {FormArray, FormGroup, Validators} from '@angular/forms';
import {MgmtFormControl} from 'mgmt-lib';

export class AttributeForm extends FormArray {

  map: Map<String, String[] | String>;

  constructor(map?: Map<String, String[] | String>) {
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
      for (let a of Array.from(Object.keys(this.map))) {
        frm.push({
          key: a,
          value: this.map[a].toString()
        });
      }
    }
    return frm;
  }

  mapForm(): Map<String, String[]> {
    if (this.length > 0) {
      const map = new Map<String, String[]>();
      for (let c of this.value) {
        map[c.key] = c.value.split(",")
      }
      return map;
    }
    return null;
  }

  mapFormString(): Map<String, String> {
    if (this.length > 0) {
      const map = new Map<String, String>();
      for (let c of this.value) {
        map[c.key] = c.value
      }
      return map;
    }
    return null;
  }
}
