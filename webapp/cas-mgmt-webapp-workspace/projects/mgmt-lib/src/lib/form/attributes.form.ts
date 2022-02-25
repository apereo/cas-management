import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';

const GROOVY_REGEX = /groovy\s*\{.*\}/s;

/**
 * Form group for displaying and updating a row in the attribute list.
 */
export class Row extends FormGroup {

  get key() { return this.get('key') as FormControl; }
  get values() { return this.get('values') as FormControl; }

  constructor(key: string = null, value: string = null) {
    super({
      key: new FormControl(key,  Validators.required),
      values: new FormControl(value, Validators.required)
    });
  }

  /**
   * Maps the form values into a string array.
   */
  map(): string[] {
    return this.values.value.split(',');
  }

  /**
   * Determines if attribute is groovy.
   */
  isGroovy(): boolean {
    const field = this.get('values');
    const val = field.value?.toString();
    const match = val ? GROOVY_REGEX.test(val) : false;
    return match;
  }

}

/**
 * Form array of Row that make up an attribute list.
 */
export class AttributesForm extends FormArray {

  constructor(map?: Map<string, string[] | string>) {
    super([]);

    if (map) {
      map = (map instanceof Map) ? map : new Map(Object.entries(map));
      for (let key of map.keys()) {
        this.createRow(key, map.get(key) as string[]);
      }
    }
  }

  /**
   * Returns the array controls cas to Row[].
   */
  rows(): Row[] {
    return this.controls as Row[];
  }

  /**
   * Adds a new row to the form.
   */
  addRow(): Row {
    const row = new Row();
    this.push(row);
    return row;
  }

  /**
   * Creates a new attribute row.
   *
   * @param key - attribute key
   * @param values - attribute values
   */
  createRow(key: string, values: string[]) {
    this.push(new Row(key, values.toString()));
  }

  /**
   * Returns the control at the passed index cast to Row.
   *
   * @param index - index of row
   */
  rowAt(index: number): Row {
    return this.at(index) as Row;
  }

  /**
   * Maps the form values to a data map with values as array.
   */
  map(): Map<string, string[]> {
    const attributes = new Map<string, string[]>();
    this.rows().forEach(r => {
      attributes[r.key.value] = r.map();
    });
    return attributes;
  }

  /**
   * Maps the form values to a data map with values as a string.
   */
  mapString(): Map<string, string> {
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
