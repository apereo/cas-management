import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WsfedclientComponent } from './wsfedclient.component';
import {FormsModule} from '@angular/forms';

describe('WsfedclientComponent', () => {
  let component: WsfedclientComponent;
  let fixture: ComponentFixture<WsfedclientComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ WsfedclientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WsfedclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
