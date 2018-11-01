/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UidattrsComponent } from './uidattrs.component';
import {FormData} from '../../domain/form-data';
import {SharedModule} from '../../shared/shared.module';

describe('UidattrsComponent', () => {
  let component: UidattrsComponent;
  let fixture: ComponentFixture<UidattrsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, SharedModule],
      declarations: [ UidattrsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UidattrsComponent);
    component = fixture.componentInstance;
    component.formData = new FormData();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
