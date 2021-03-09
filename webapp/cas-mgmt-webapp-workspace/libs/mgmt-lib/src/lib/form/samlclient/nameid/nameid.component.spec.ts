import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {SamlNameidComponent} from './nameid.component';

describe('NameidComponent', () => {
  let component: SamlNameidComponent;
  let fixture: ComponentFixture<SamlNameidComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SamlNameidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SamlNameidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
