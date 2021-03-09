import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {SamlAddComponent} from './add.component';

describe('AddComponent', () => {
  let component: SamlAddComponent;
  let fixture: ComponentFixture<SamlAddComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SamlAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SamlAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
