import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Location, LocationStrategy } from '@angular/common';
import { DiffComponent } from './diff.component';
import {EditorComponent} from '../../project-share/editor.component';
import {ChangesService} from '../changes/changes.service';
import {AbstractRegisteredService, DiffEntry, RegexRegisteredService} from 'mgmt-lib';

const changesServiceStub = {
  getChanges(branch: String): Promise<DiffEntry[]> {
    return Promise.resolve([]);
  },

  getDiff(diff: DiffEntry): Promise<String> {
    return Promise.resolve('');
  },

  getChange(change: String): Promise<AbstractRegisteredService> {
    return Promise.resolve(new RegexRegisteredService())
  }
};

const locationStub = {

};

describe('DiffComponent', () => {
  let component: DiffComponent;
  let fixture: ComponentFixture<DiffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiffComponent, EditorComponent],
      providers: [
        {provide: ChangesService, useValue: changesServiceStub},
        {provide: Location, useValue: locationStub},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiffComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
