import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {GroovySurrogateComponent} from './groovy-surrogate.component';

describe('GroovySurrogateComponent', () => {
  let component: GroovySurrogateComponent;
  let fixture: ComponentFixture<GroovySurrogateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GroovySurrogateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroovySurrogateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
