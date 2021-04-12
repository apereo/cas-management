import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GroovyComponent } from './groovy.component';

describe('GroovyComponent', () => {
  let component: GroovyComponent;
  let fixture: ComponentFixture<GroovyComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GroovyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroovyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
