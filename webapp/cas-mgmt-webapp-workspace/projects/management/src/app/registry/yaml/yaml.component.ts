import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common';
import {ServiceViewService} from '../services/service.service';
import {HttpErrorResponse} from '@angular/common/http';
import {MatSnackBar} from '@angular/material';
import {EditorComponent} from 'shared-lib';

@Component({
  selector: 'app-yaml',
  templateUrl: './yaml.component.html'
})
export class YamlComponent implements OnInit, AfterViewInit {

  file: string;

  changed = false;

  @ViewChild('editor', { static: true })
  editor: EditorComponent;

  constructor(private service: ServiceViewService,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar,
              private location: Location) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.route.data
        .subscribe((data: { resp: string }) => {
          this.file = data.resp;
        });
    }, 100);
  }

  save() {
    this.service.saveYaml(this.route.snapshot.params.id, this.editor.getFile())
      .subscribe(() => this.handleSuccess(),
        error => this.handleError(error)
      );
  }



  handleSuccess() {
    this.snackBar.open(
      'Service successfully saved',
      'Dismiss',
      { duration: 5000 }
    );
    this.location.back();
  }

  handleError(error: HttpErrorResponse) {
    this.snackBar.open(
      error.error.message,
      'Dismiss',
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
