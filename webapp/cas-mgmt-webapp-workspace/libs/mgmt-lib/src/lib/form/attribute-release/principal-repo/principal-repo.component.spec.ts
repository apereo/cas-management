import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {PrincipalRepoComponent} from './principal-repo.component';
import {SharedModule} from '../../../shared/shared.module';
import {FormsModule} from '@angular/forms';

describe('PrincipalRepoComponent', () => {
  let component: PrincipalRepoComponent;
  let fixture: ComponentFixture<PrincipalRepoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, SharedModule],
      declarations: [ PrincipalRepoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrincipalRepoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
