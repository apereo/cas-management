/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { TabPropertiesComponent } from './tab-properties.component';
import {PropertiesComponent} from '@apereo/mgmt-lib/src/lib/field';
import {DataRecord} from '@apereo/mgmt-lib/src/lib/form';

describe('TabPropertiesComponent', () => {
  let component: TabPropertiesComponent;
  let fixture: ComponentFixture<TabPropertiesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ TabPropertiesComponent, PropertiesComponent ],
      providers: [ DataRecord ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
