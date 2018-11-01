/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RequiredHandlersComponent } from './reqhandlers.component';
import {SharedModule} from '../../shared/shared.module';

describe('ReqhandlersComponent', () => {
  let component: RequiredHandlersComponent;
  let fixture: ComponentFixture<RequiredHandlersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, SharedModule ],
      declarations: [ RequiredHandlersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequiredHandlersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
