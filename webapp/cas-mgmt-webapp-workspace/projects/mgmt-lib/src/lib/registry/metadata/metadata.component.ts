import {Component, AfterViewInit, ViewChild, OnDestroy, OnInit} from '@angular/core';
import { Location } from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {AppConfigService, ControlsService, EditorComponent} from '@apereo/mgmt-lib/src/lib/ui';
import {Metadata} from '@apereo/mgmt-lib/src/lib/model';
import {SamlService} from '../saml/saml.service';
import {Subscription} from 'rxjs';

/**
 * Component to display metadata for a Saml Service.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-metadata',
  templateUrl: './metadata.component.html',
  styleUrls: ['./metadata.component.css']
})
export class MetadataEditorComponent implements OnInit, OnDestroy, AfterViewInit {

  metadata: Metadata;

  changed = false;

  @ViewChild('editor', { static: true })
  editor: EditorComponent;

  subscriptions: Subscription[] = [];

  constructor(private service: SamlService,
              private location: Location,
              private route: ActivatedRoute,
              private app: AppConfigService,
              public controls: ControlsService) {
    this.controls.icon = 'code';
    this.controls.title = 'Metadata';
  }

  /**
   * Init controls.
   */
  ngOnInit() {
    this.controls.resetButtons();
    this.controls.showEdit = this.changed && !this.isInCommon();
    this.controls.showEditorOptions = true;
    this.subscriptions.push(this.controls.save.subscribe(() => this.save()));
    this.subscriptions.push(this.controls.reset.subscribe(() => this.reset()));
    this.subscriptions.push(this.controls.editorOptions.subscribe(() => this.editor.showOptions()));
  }

  /**
   * Destroy subscriptions.
   */
  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  /**
   * Extracts metadata from the resolver after the view is initialized.
   */
  ngAfterViewInit() {
    setTimeout(() => {
      this.route.data
        .subscribe((data: { resp: Metadata }) => {
          this.metadata = data.resp;
       });
    }, 100);
  }

  /**
   * Saves the edited metadata to the server.
   */
  save() {
    this.service.saveMetadata(this.route.snapshot.params.id, this.editor.getFile())
      .subscribe(() => this.handleSuccess(), error => this.handleError(error));
  }

  /**
   * Handles successful call to save the metadata on the server.
   */
  private handleSuccess() {
    this.app.showSnackBar('Service successfully saved');
    this.location.back();
  }

  /**
   * Handles unsuccessful calls to save the metadata to the server.
   *
   * @param error - HttpErrorResponse
   */
  handleError(error: HttpErrorResponse) {
    this.app.showSnackBar(error.error.message);
  }

  /**
   * Sets the changed flag to true.
   */
  change() {
    this.changed = true;
  }

  /**
   * Reverts any changes in the editor back to the currently saved file.
   */
  reset() {
    this.changed = false;
    this.editor.file = this.metadata.metadata;
  }

  /**
   * Returns true if metadata is from InCommon and can not be edited.
   */
  isInCommon(): boolean {
    return this.metadata && this.metadata.inCommon;
  }

  /**
   * Returns the metadata as a string.
   */
  getMetadata(): string {
    return this.metadata ? this.metadata.metadata : '';
  }

}
