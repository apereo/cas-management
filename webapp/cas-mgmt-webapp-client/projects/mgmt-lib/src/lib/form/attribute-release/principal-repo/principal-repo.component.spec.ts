import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalRepoComponent } from './principal-repo.component';
import {SharedModule} from '../../../shared/shared.module';
import {FormsModule} from '@angular/forms';
import {Messages} from '../../../messages';
import {FormData} from '../../../../domain/form-data';

describe('PrincipalRepoComponent', () => {
  let component: PrincipalRepoComponent;
  let fixture: ComponentFixture<PrincipalRepoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, SharedModule],
      declarations: [ PrincipalRepoComponent ],
      providers: [Messages]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrincipalRepoComponent);
    component = fixture.componentInstance;
    component.formData = new FormData;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
