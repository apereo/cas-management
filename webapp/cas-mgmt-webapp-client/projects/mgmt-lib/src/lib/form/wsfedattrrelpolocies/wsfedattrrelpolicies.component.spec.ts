import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WsfedattrrelpoliciesComponent } from './wsfedattrrelpolicies.component';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule} from '@angular/forms';
import {FormData} from '../../domain/form-data';

describe('WsfedattrrelpoliciesComponent', () => {
  let component: WsfedattrrelpoliciesComponent;
  let fixture: ComponentFixture<WsfedattrrelpoliciesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, SharedModule ],
      declarations: [ WsfedattrrelpoliciesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WsfedattrrelpoliciesComponent);
    component = fixture.componentInstance;
    component.formData = new FormData();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
