import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WsfedattrrelpoliciesComponent } from './wsfedattrrelpolicies.component';
import {FormsModule} from '@angular/forms';

describe('WsfedattrrelpoliciesComponent', () => {
  let component: WsfedattrrelpoliciesComponent;
  let fixture: ComponentFixture<WsfedattrrelpoliciesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ WsfedattrrelpoliciesComponent ],
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
