/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {FormsModule} from '@angular/forms';

import {TabPropertiesComponent} from './tab-properties.component';
import {DataRecord, SharedModule} from 'mgmt-lib';
import {PropertiespaneComponent} from 'mgmt-lib/lib/form/propertiespane/propertiespane.component';

describe('TabPropertiesComponent', () => {
  let component: TabPropertiesComponent;
  let fixture: ComponentFixture<TabPropertiesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, SharedModule ],
      declarations: [ TabPropertiesComponent, PropertiespaneComponent ],
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
