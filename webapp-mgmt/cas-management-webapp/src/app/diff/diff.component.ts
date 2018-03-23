import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import {ChangesService} from '../changes/changes.service';
import { Location } from '@angular/common';
import {Messages} from '../messages';
import { EditorComponent } from '../editor.component';
import {ActivatedRoute} from '@angular/router';
import {SubmissionsService} from '../submissions/submissions.service';

@Component({
  selector: 'app-diff',
  templateUrl: './diff.component.html',
  styleUrls: ['./diff.component.css']
})
export class DiffComponent implements AfterViewInit, OnInit {

  file: String;

  @ViewChild('editor')
  editor: EditorComponent;

  constructor(public messages: Messages,
              private service: ChangesService,
              private submissionService: SubmissionsService,
              private route: ActivatedRoute) { }

  ngAfterViewInit() {
    if (this.route.snapshot.data.submission) {
      this.submissionService.diff(this.route.snapshot.params['id'])
        .then(diff => this.file = diff);
    } else {
      this.service.viewDiff(this.route.snapshot.params['oldId'], this.route.snapshot.params['newId'])
        .then(diff => this.file = diff);
    }
  }

  ngOnInit() {

  }
}
