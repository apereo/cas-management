/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {FormsModule} from '@angular/forms';

import {UidattrsComponent} from './uidattrs.component';
import {SharedModule} from '../../shared/shared.module';

describe('UidattrsComponent', () => {
  let component: UidattrsComponent;
  let fixture: ComponentFixture<UidattrsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, SharedModule],
      declarations: [ UidattrsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UidattrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
