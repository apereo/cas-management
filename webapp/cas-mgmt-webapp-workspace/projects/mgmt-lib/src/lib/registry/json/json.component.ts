import {Component, AfterViewInit, ViewChild, OnDestroy, OnInit} from '@angular/core';
import { Location } from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {AppConfigService, ControlsService, EditorComponent} from '@apereo/mgmt-lib/src/lib/ui';
import {RegistryService} from '../registry.service';
import {Subscription} from 'rxjs';

/**
 * Component to display and edit a service as json.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-json',
  templateUrl: './json.component.html',
  styleUrls: ['./json.component.css']
})
export class JSONComponent implements OnInit, OnDestroy, AfterViewInit {

  file: string;

  changed = false;

  @ViewChild('editor', { static: true })
  editor: EditorComponent;

  subscriptions: Subscription[] = [];

  constructor(private service: RegistryService,
              private location: Location,
              private route: ActivatedRoute,
              private app: AppConfigService,
              public controls: ControlsService) {
    this.controls.title = 'View JSON';
    this.controls.icon = 'code';
  }

  /**
   * Inits controls for component.
   */
  ngOnInit() {
    this.controls.resetButtons();
    this.controls.showEdit = true;
    this.controls.showEditorOptions = true;
    this.subscriptions.push(this.controls.save.subscribe(() => this.save()));
    this.subscriptions.push(this.controls.reset.subscribe(() => this.reset()));
    this.subscriptions.push(this.controls.editorOptions.subscribe(() => this.editor.showOptions()));
  }

  /**
   * Destroys subscriptions.
   */
  ngOnDestroy(): void  {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  /**
   * Starts the component after thew is available and loads the service from the resolver.
   */
  ngAfterViewInit() {
    setTimeout(() => {
      this.route.data
        .subscribe((data: { resp: string }) => {
          this.file = data.resp;
       });
    }, 100);
  }

  /**
   * Saves the changes made to the service.
   */
  save() {
    this.service.saveJson(this.route.snapshot.params.id, this.editor.getFile())
      .subscribe(() => this.handleSuccess(), error => this.handleError(error));
  }

  /**
   * Handles successful call to the server to save the service.
   */
  private handleSuccess() {
    this.app.showSnackBar('Service successfully saved');
    this.location.back();
  }

  /**
   * Handles an error from the call to save a service.
   *
   * @param error - HttpErrorResponse
   */
  private handleError(error: HttpErrorResponse) {
    this.app.showSnackBar(error.error.message);
  }

  /**
   * Sets the changed flag for this service.
   */
  change() {
    this.changed = true;
  }

  /**
   * Resets the editor to revert back to currently saved file for the service.
   */
  reset() {
    this.changed = false;
    this.editor.file = this.file;
  }

}
