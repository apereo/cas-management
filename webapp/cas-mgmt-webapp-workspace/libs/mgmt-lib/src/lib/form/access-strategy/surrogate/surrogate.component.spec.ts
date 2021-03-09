import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {SurrogateComponent} from './surrogate.component';

describe('SurrogateComponent', () => {
  let component: SurrogateComponent;
  let fixture: ComponentFixture<SurrogateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SurrogateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurrogateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
