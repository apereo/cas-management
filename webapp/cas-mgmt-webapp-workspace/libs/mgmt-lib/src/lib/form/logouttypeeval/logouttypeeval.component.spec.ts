/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';

import {LogouttypeevalComponent} from './logouttypeeval.component';
import {SharedModule} from '../../shared/shared.module';

describe('LogouttypeevalComponent', () => {
  let component: LogouttypeevalComponent;
  let fixture: ComponentFixture<LogouttypeevalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, SharedModule ],
      declarations: [ LogouttypeevalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogouttypeevalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
