import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorOptionsComponent } from './editor-options.component';

describe('EditorOptionsComponent', () => {
  let component: EditorOptionsComponent;
  let fixture: ComponentFixture<EditorOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
