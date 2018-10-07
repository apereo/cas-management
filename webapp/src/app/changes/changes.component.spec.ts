/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


import { ChangesComponent } from './changes.component';
import {DiffEntry} from '../../domain/diff-entry';
import {ChangesService} from './changes.service';
import {Messages} from '../messages';
import {ActivatedRouteStub} from '../../testing/router-stub';
import {AbstractRegisteredService, RegexRegisteredService} from '../../domain/registered-service';
import {RouterTestingModule} from '@angular/router/testing';


const changesServiceStub = {
  getChanges(branch: String): Promise<DiffEntry[]> {
    return Promise.resolve([]);
  },

  getDiff(diff: DiffEntry): Promise<String> {
    return Promise.resolve('');
  },

  getChange(change: String): Promise<AbstractRegisteredService> {
    return Promise.resolve(new RegexRegisteredService());
  }
};

const activatedRoute: ActivatedRouteStub = new ActivatedRouteStub();

const expectedDiff: DiffEntry[] = [];

describe('ChangesComponent', () => {
  let component: ChangesComponent;
  let fixture: ComponentFixture<ChangesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [ ChangesComponent ],
      providers: [
        Messages,
        {provide: ChangesService, useValue: changesServiceStub},
        {provide: ActivatedRoute, useValue: activatedRoute}
      ]
    })
    .compileComponents();
  }));

  beforeEach( async(() => {

  }));

  beforeEach(() => {
    activatedRoute.testData = expectedDiff;
    fixture = TestBed.createComponent(ChangesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
