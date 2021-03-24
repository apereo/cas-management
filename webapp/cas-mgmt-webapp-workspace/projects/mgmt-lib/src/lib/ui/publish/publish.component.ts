import {Component, OnInit} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {ControlsService} from '../controls/controls.service';
import {Commit} from '@apereo/mgmt-lib/src/lib/model';

/**
 * Dialog component to confirm publishing changes to CAS Servers.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-publish',
  templateUrl: './publish.component.html'
})

export class PublishComponent implements OnInit {

  commits: Commit[];

  constructor(public dialogRef: MatDialogRef<PublishComponent>,
              public controlsService: ControlsService) { }

  /**
   * Starts the component by retrieving unpublished commits from the repository.
   */
  ngOnInit() {
    this.controlsService.getCommits().subscribe(resp => this.commits = resp);
  }
}
