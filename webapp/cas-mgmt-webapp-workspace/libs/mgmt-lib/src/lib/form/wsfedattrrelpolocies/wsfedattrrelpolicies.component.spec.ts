import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {WsfedattrrelpoliciesComponent} from './wsfedattrrelpolicies.component';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule} from '@angular/forms';
import {FormData} from '../../domain/form-data';
import {FormDataService} from '../../form-data.service';

describe('WsfedattrrelpoliciesComponent', () => {
  let component: WsfedattrrelpoliciesComponent;
  let fixture: ComponentFixture<WsfedattrrelpoliciesComponent>;
  let formDataStub: Partial<FormDataService>;

  formDataStub = {
    options: new FormData()
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, SharedModule ],
      declarations: [ WsfedattrrelpoliciesComponent ],
      providers: [ {provide: FormDataService, useValue: formDataStub}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WsfedattrrelpoliciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
