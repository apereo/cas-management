/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { MfaComponent } from './mfa.component';
import {Messages} from '../../messages';
import {SharedModule} from '../../shared/shared.module';

describe('MfaComponent', () => {
  let component: MfaComponent;
  let fixture: ComponentFixture<MfaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, SharedModule ],
      declarations: [ MfaComponent ],
      providers: [ Messages ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MfaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
