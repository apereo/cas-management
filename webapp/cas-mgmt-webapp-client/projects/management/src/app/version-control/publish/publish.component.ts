import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {ControlsService} from '../../project-share/controls/controls.service';
import {Commit} from 'mgmt-lib';

@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.css']
})

export class PublishComponent implements OnInit {

    commits: Commit[];

    constructor(public dialogRef: MatDialogRef<PublishComponent>,
                public controlsService: ControlsService) { }

    ngOnInit() {
        this.controlsService.getCommits().subscribe(resp => this.commits = resp);
    }
}
