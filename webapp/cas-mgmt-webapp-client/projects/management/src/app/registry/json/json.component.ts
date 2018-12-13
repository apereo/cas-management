import {Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import { Location } from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {ServiceViewService} from '../services/service.service';
import {EditorComponent} from '../../project-share/editor.component';
import {MatSnackBar} from '@angular/material';
import {HttpErrorResponse} from '@angular/common/http';
import {SpinnerService} from 'mgmt-lib';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-json',
  templateUrl: './json.component.html',
  styleUrls: ['./json.component.css']
})
export class JSONComponent implements AfterViewInit, OnInit {

  file: String;

  changed = false;

  @ViewChild('editor')
  editor: EditorComponent;

  constructor(private service: ServiceViewService,
              private location: Location,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar,
              private spinner: SpinnerService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.route.data
        .subscribe((data: { resp: String }) => {
          this.file = data.resp;
       });
    }, 100);
  }

  save() {
    this.spinner.start('Saving json');
    this.service.saveJson(this.route.snapshot.params['id'], this.editor.getFile())
      .pipe(finalize(() => this.spinner.stop()))
      .subscribe(resp => this.handleSuccess(), error => this.handleError(error));
  }

  handleSuccess() {
    this.snackBar.open(
      "Service successfully saved",
      "Dismiss",
      { duration: 5000 }
    );
    this.location.back();
  }

  handleError(error: HttpErrorResponse) {
    this.snackBar.open(
      error.error.message,
      "Dismiss",
      { duration: 5000 }
    );
  }

  change() {
    this.changed = true;
  }

  reset() {
    this.changed = false;
    this.editor.file = this.file;
  }

}
