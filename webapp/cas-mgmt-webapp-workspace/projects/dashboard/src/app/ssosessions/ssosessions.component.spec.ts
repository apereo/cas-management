import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {SsosessionsComponent} from './ssosessions.component';

describe('SsosessionsComponent', () => {
  let component: SsosessionsComponent;
  let fixture: ComponentFixture<SsosessionsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SsosessionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsosessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
