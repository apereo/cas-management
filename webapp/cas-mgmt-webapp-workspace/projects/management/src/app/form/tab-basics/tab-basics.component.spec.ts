/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TabBasicsComponent } from './tab-basics.component';
import {DataRecord,
  SharedModule,
  ServicenameComponent,
  ServiceIdComponent,
  ServicedescComponent,
  LogoComponent,
  LinkrefsComponent,
  EnabledComponent,
  ThemeidComponent
} from 'mgmt-lib';

describe('TabBasicsComponent', () => {
  let component: TabBasicsComponent;
  let fixture: ComponentFixture<TabBasicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, SharedModule ],
      declarations: [
        TabBasicsComponent,
        ServiceIdComponent,
        ServicenameComponent,
        ServicedescComponent,
        LogoComponent,
        ThemeidComponent,
        LinkrefsComponent,
        EnabledComponent
      ],
      providers: [ DataRecord ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabBasicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
