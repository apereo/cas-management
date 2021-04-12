import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ChecksComponent } from './checks.component';
import {FormsModule} from '@angular/forms';

describe('ChecksComponent', () => {
  let component: ChecksComponent;
  let fixture: ComponentFixture<ChecksComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule],
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
