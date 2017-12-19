import {Component, OnInit, Inject} from '@angular/core';
import {Messages} from '../messages';
import {Commit} from '../../domain/commit';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ControlsService} from '../controls/controls.service';

@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.css']
})

export class PublishComponent implements OnInit {

    commits: Commit[];

    constructor(public dialogRef: MatDialogRef<PublishComponent>,
                public messages: Messages,
                public controlsService: ControlsService) { }

    ngOnInit() {
        this.controlsService.getCommits().then(resp => this.commits = resp);
    }
}
