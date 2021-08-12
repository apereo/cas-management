import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipAutocompleteComponent } from './chip-autocomplete.component';

describe('ChipAutocompleteComponent', () => {
    let component: ChipAutocompleteComponent;
    let fixture: ComponentFixture<ChipAutocompleteComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ChipAutocompleteComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ChipAutocompleteComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
