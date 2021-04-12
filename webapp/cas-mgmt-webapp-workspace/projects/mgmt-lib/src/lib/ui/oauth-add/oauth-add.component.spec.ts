import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {OAuthAddComponent} from './oauth-add.component';

describe('AddComponent', () => {
  let component: OAuthAddComponent;
  let fixture: ComponentFixture<OAuthAddComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OAuthAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OAuthAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
