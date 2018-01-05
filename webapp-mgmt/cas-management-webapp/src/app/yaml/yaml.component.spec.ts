import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YamlComponent } from './yaml.component';

describe('YamlComponent', () => {
  let component: YamlComponent;
  let fixture: ComponentFixture<YamlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YamlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YamlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
