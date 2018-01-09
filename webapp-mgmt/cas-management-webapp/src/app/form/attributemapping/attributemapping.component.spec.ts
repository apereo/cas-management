/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { AttributemappingComponent } from './attributemapping.component';
import {Messages} from '../../messages';
import {SharedModule} from '../../shared/shared.module';

describe('AttributemappingComponent', () => {
  let component: AttributemappingComponent;
  let fixture: ComponentFixture<AttributemappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, SharedModule ],
      declarations: [ AttributemappingComponent ],
      providers: [ Messages ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttributemappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
