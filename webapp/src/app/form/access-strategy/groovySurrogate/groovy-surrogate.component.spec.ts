import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroovySurrogateComponent } from './groovy-surrogate.component';

describe('GroovyComponent', () => {
  let component: GroovySurrogateComponent;
  let fixture: ComponentFixture<GroovySurrogateComponent>;

  beforeEach(async(() => {
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
