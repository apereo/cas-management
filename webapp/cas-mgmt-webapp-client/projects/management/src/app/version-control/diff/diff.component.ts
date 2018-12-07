import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import {ChangesService} from '../changes/changes.service';
import { EditorComponent } from '../../project-share/editor.component';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-diff',
  templateUrl: './diff.component.html',
  styleUrls: ['./diff.component.css']
})
export class DiffComponent implements AfterViewInit, OnInit {

  file: String;

  @ViewChild('editor')
  editor: EditorComponent;

  constructor(private service: ChangesService,
              private route: ActivatedRoute) { }

  ngAfterViewInit() {
    this.service.viewDiff(this.route.snapshot.params['oldId'], this.route.snapshot.params['newId'])
      .subscribe((diff: String) => this.file = diff);
  }

  ngOnInit() {

  }
}
