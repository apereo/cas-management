import { Component, ElementRef, Input, Directive, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocomplete, MatAutocompleteTrigger } from "@angular/material/autocomplete";

import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
    selector: 'lib-chip-autocomplete',
    templateUrl: './chip-autocomplete.component.html',
    styleUrls: ['./chip-autocomplete.component.css']
})
export class ChipAutocompleteComponent implements OnInit {

    separatorKeysCodes: number[] = [ENTER, COMMA];

    @Input()
    control: FormControl;

    @Input()
    toolTip: string;

    @Input()
    label: string;

    options: string[] = [];

    @Input()
    valueOptions: any[] = [];

    filteredOptions: Observable<string[]>;

    @Input()
    required = false;

    @Input()
    multiple = false;

    @Input()
    errors: any[];

    inputCtrl: FormControl = new FormControl('');
    chipCtrl: FormControl = new FormControl('');

    @ViewChild('optInput') optInput: ElementRef<HTMLInputElement>;

    constructor() {
    }

    ngOnInit(): void {
        this.control.valueChanges.pipe(startWith(this.control.value)).subscribe(v => {
            this.options = v;
            // this.markChanged();
        });
    }

    ngOnChanges(): void {
        console.log('changes', this.control.value);
    }

    private markChanged(): void {
        this.control.updateValueAndValidity();
        this.control.markAsDirty();
        this.control.markAsTouched();
    }

    add(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;

        // Add our fruit
        if ((value || '').trim()) {
            this.control.setValue([...this.options, value.trim()]);
            this.markChanged();
        }

        // Reset the input value
        if (input) {
            input.value = '';
        }
    }

    remove(i: string): void {
        const index = this.control.value.indexOf(i);

        if (index >= 0) {
            this.control.value.splice(index, 1);
            this.markChanged();
        }
    }

    select(event: MatAutocompleteSelectedEvent): void {
        this.control.setValue([...(this.control.value || []), event.option.value]);
        this.markChanged();
        this.optInput.nativeElement.value = '';
        this.inputCtrl.setValue(null);
    }

    private _filter(value: string): string[] {
        const filterValue = value?.toLowerCase();

        return this.valueOptions.filter(o => o?.value?.toLowerCase().includes(filterValue));
    }

}



/**
 * This hack is necessary because `MatAutocompleteTrigger` provides `NG_VALUE_ACCESSOR`,
 * which doesn't make any sense when used in combination with `MatChipInput`.
 */
@Directive({
    selector: `input[matChipAutocomplete], textarea[matChipAutocomplete]`,
    host: {
        'class': 'mat-autocomplete-trigger',
        '[attr.autocomplete]': 'autocompleteAttribute',
        '[attr.role]': 'autocompleteDisabled ? null : "combobox"',
        '[attr.aria-autocomplete]': 'autocompleteDisabled ? null : "list"',
        '[attr.aria-activedescendant]': '(panelOpen && activeOption) ? activeOption.id : null',
        '[attr.aria-expanded]': 'autocompleteDisabled ? null : panelOpen.toString()',
        '[attr.aria-owns]': '(autocompleteDisabled || !panelOpen) ? null : autocomplete?.id',
        '[attr.aria-haspopup]': '!autocompleteDisabled',
        // Note: we use `focusin`, as opposed to `focus`, in order to open the panel
        // a little earlier. This avoids issues where IE delays the focusing of the input.
        '(focusin)': '_handleFocus()',
        '(blur)': '_onTouched()',
        '(input)': '_handleInput($event)',
        '(keydown)': '_handleKeydown($event)',
    },
    exportAs: 'matAutocompleteTrigger'
})
export class MatChipAutocompleteTrigger extends MatAutocompleteTrigger {
    @Input('matChipAutocomplete')
    public set matChipAutocomplete(value: MatAutocomplete) {
        this.autocomplete = value;
    }
}