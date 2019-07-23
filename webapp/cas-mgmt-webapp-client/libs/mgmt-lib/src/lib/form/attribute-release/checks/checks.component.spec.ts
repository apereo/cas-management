import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecksComponent } from './checks.component';
import {SharedModule} from '../../../shared/shared.module';
import {FormsModule} from '@angular/forms';

describe('ChecksComponent', () => {
  let component: ChecksComponent;
  let fixture: ComponentFixture<ChecksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, SharedModule],
      declarations: [ ChecksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
