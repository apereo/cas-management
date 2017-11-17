/* tslint:disable:no-unused-variable */
import 'ace-builds/src-min-noconflict/ace';
import 'ace-builds/src-min-noconflict/keybinding-vim';
import 'ace-builds/src-min-noconflict/mode-diff';
import 'ace-builds/src-min-noconflict/mode-text';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PullComponent } from './pull.component';
import {NotesComponent} from '../notes/notes.component';
import {Change} from '../../domain/change';
import {Messages} from '../messages';
import {ControlsService} from '../controls/controls.service';
import { Branch } from '../../domain/branch';
import {PullService} from './pull.service';
import {NotesService} from '../notes/notes.service';
import {EditorComponent} from '../editor.component';

const controlsServiceStub = {
  commit(msg: String): Promise<String> {
    return Promise.resolve('');
  },

  publish(): Promise<void> {
    return Promise.resolve();
  },

  submit(): Promise<void> {
    return Promise.resolve();
  },

  untracked(): Promise<Change[]> {
    return Promise.resolve([]);
  },

  unpublished(): Promise<number> {
    return Promise.resolve(0);
  }
};

const pullServiceStub = {
  getBranches(): Promise<Branch[]> {
    return Promise.resolve([]);
  },

  accept(id: String): Promise<String> {
    return Promise.resolve('');
  },

  reject(id: String): Promise<String> {
    return Promise.resolve('');
  }
};

const noteServiceStub = {
  getNotes(id: String): Promise<String> {
    return Promise.resolve('');
  },

  addNote(id: String, text: String): Promise<String> {
    return Promise.resolve('');
  }
};



describe('PullComponent', () => {
  let component: PullComponent;
  let fixture: ComponentFixture<PullComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RouterTestingModule
      ],
      declarations: [
        PullComponent,
        NotesComponent,
        EditorComponent
      ],
      providers: [
        Messages,
        {provide: ControlsService, useValue: controlsServiceStub},
        {provide: PullService, useValue: pullServiceStub},
        {provide: NotesService, useValue: noteServiceStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PullComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
