import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PrincipalRepoComponent } from './principal-repo.component';
import {FormsModule} from '@angular/forms';

describe('PrincipalRepoComponent', () => {
  let component: PrincipalRepoComponent;
  let fixture: ComponentFixture<PrincipalRepoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
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
