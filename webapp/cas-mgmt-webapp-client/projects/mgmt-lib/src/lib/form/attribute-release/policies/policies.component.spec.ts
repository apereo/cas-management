import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliciesComponent } from './policies.component';
import {FormData} from '../../../domain/form-data';
import {SharedModule} from '../../../shared/shared.module';
import {FormsModule} from '@angular/forms';

describe('PoliciesComponent', () => {
  let component: PoliciesComponent;
  let fixture: ComponentFixture<PoliciesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, SharedModule],
      declarations: [ PoliciesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoliciesComponent);
    component = fixture.componentInstance;
    component.formData = new FormData();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
