import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common';
import {HttpErrorResponse} from '@angular/common/http';
import {AppConfigService, ControlsService, EditorComponent} from '@apereo/mgmt-lib/src/lib/ui';
import {RegistryService} from '../registry.service';
import {Subscription} from 'rxjs';

/**
 * Component that displays and allows editing of a service in yaml form.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-yaml',
  templateUrl: './yaml.component.html'
})
export class YamlComponent implements AfterViewInit, OnInit, OnDestroy {

  file: string;

  changed = false;

  @ViewChild('editor', { static: true })
  editor: EditorComponent;

  subscriptions: Subscription[] = [];

  constructor(private service: RegistryService,
              private route: ActivatedRoute,
              private app: AppConfigService,
              private controls: ControlsService,
              private location: Location) {
    this.controls.title = 'View YAML';
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
   * After view is intitialized sets the text of the editor to the string form the resolver.
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
   * Calls the server to save the edited service.
   */
  save() {
    this.service.saveYaml(this.route.snapshot.params.id, this.editor.getFile())
      .subscribe(() => this.handleSuccess(),
        error => this.handleError(error)
      );
  }

  /**
   * Handles successful call to save the service on the server.
   */
  private handleSuccess() {
    this.app.showSnackBar('Service successfully saved');
    this.location.back();
  }

  /**
   * Handles an unsuccessful call to server to save a service.
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
   * Resets the view to the currently saved version.
   */
  reset() {
    this.changed = false;
    this.editor.file = this.file;
  }

}
