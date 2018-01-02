import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { EditorComponent } from '../editor.component';
import { Messages } from '../messages';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {NotesService} from './notes.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})

export class NotesComponent implements OnInit {

  @Output()
  commit: EventEmitter<String> = new EventEmitter<String>();

  @ViewChild('editor')
  editor: EditorComponent;

  @Input()
  viewOnly: boolean;

  file: String;

  constructor(public messages: Messages,
              public route: ActivatedRoute,
              public service: NotesService) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.service.getNotes(id).then(resp => this.file = resp);
  }

  saveNote() {
    this.commit.emit(this.editor.getFile());
  }

}
