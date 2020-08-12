import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {EditorComponent} from 'shared-lib';
import {Metadata} from 'domain-lib';
import {MetadataService} from '@app/registry/metadata/metadata.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-metadata',
  templateUrl: './metadata.component.html',
  styleUrls: ['./metadata.component.css']
})
export class MetadataComponent implements AfterViewInit, OnInit {

  metadata: Metadata;

  changed = false;

  @ViewChild('editor', { static: true })
  editor: EditorComponent;

  constructor(private service: MetadataService,
              private location: Location,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.route.data
        .subscribe((data: { resp: Metadata }) => {
          this.metadata = data.resp;
       });
    }, 100);
  }

  save() {
    this.service.saveMetadata(this.route.snapshot.params.id, this.editor.getFile())
      .subscribe(resp => this.handleSuccess(), error => this.handleError(error));
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
    this.editor.file = this.metadata.metadata;
  }

  isInCommon(): boolean {
    return this.metadata && this.metadata.inCommon;
  }

  getMetadata(): string {
    return this.metadata ? this.metadata.metadata : '';
  }

}
