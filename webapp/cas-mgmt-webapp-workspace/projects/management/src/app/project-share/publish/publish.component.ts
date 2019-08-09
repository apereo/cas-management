import {Component, OnInit} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {ControlsService} from '../controls/controls.service';
import {Commit} from 'domain-lib';

@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html'
})

export class PublishComponent implements OnInit {

    commits: Commit[];

    constructor(public dialogRef: MatDialogRef<PublishComponent>,
                public controlsService: ControlsService) { }

    ngOnInit() {
        this.controlsService.getCommits().subscribe(resp => this.commits = resp);
    }
}
