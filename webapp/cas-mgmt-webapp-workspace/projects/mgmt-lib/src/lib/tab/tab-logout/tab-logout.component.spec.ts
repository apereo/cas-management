/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { TabLogoutComponent } from './tab-logout.component';
import {LogoutComponent, LogouttypeevalComponent} from '@apereo/mgmt-lib/src/lib/field';
import {DataRecord} from '@apereo/mgmt-lib/src/lib/form';

describe('TabLogoutComponent', () => {
  let component: TabLogoutComponent;
  let fixture: ComponentFixture<TabLogoutComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ TabLogoutComponent, LogoutComponent, LogouttypeevalComponent ],
      providers: [ DataRecord ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabLogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
