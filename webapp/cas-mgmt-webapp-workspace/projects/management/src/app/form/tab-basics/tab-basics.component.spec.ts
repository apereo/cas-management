/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {FormsModule} from '@angular/forms';

import {TabBasicsComponent} from './tab-basics.component';
import {DataRecord, EnabledComponent, LinkrefsComponent, LogoComponent, ServicedescComponent, ServiceIdComponent, ServicenameComponent, SharedModule, ThemeidComponent} from 'mgmt-lib';

describe('TabBasicsComponent', () => {
  let component: TabBasicsComponent;
  let fixture: ComponentFixture<TabBasicsComponent>;

  beforeEach(waitForAsync(() => {
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
