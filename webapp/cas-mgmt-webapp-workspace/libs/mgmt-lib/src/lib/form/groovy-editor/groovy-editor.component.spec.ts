import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroovyEditorComponent } from './groovy-editor.component';

describe('GroovyEditorComponent', () => {
    let component: GroovyEditorComponent;
    let fixture: ComponentFixture<GroovyEditorComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [GroovyEditorComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GroovyEditorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
