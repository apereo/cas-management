/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { TabMulitauthComponent } from './tab-mulitauth.component';
import {MfaComponent} from '@apereo/mgmt-lib/src/lib/field';
import {DataRecord} from '@apereo/mgmt-lib/src/lib/form';

describe('TabMulitauthComponent', () => {
  let component: TabMulitauthComponent;
  let fixture: ComponentFixture<TabMulitauthComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ TabMulitauthComponent, MfaComponent ],
      providers: [ DataRecord]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabMulitauthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
