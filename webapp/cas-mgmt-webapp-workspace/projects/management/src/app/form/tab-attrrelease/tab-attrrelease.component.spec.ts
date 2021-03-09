/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {TabAttrreleaseComponent} from './tab-attrrelease.component';

describe('TabAttrreleaseComponent', () => {
  let component: TabAttrreleaseComponent;
  let fixture: ComponentFixture<TabAttrreleaseComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabAttrreleaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
