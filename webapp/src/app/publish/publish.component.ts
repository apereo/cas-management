import {Component, OnInit} from '@angular/core';
import {Messages} from '../messages';
import {Commit} from '../../domain/commit';
import {MatDialogRef} from '@angular/material';
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
        this.controlsService.getCommits().subscribe(resp => this.commits = resp);
    }
}
