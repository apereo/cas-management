import { Component, OnInit, AfterViewInit} from '@angular/core';
import {ChangesService} from '../changes/changes.service';
import { Location } from '@angular/common';
import {Messages} from '../messages';
import {ActivatedRoute} from '@angular/router';
import {AbstractRegisteredService} from '../../domain/registered-service';

@Component({
  selector: 'app-json',
  templateUrl: './json.component.html',
  styleUrls: ['./json.component.css']
})
export class JSONComponent implements AfterViewInit, OnInit {

  file: String;

  constructor(public messages: Messages,
              private service: ChangesService,
              private location: Location,
              private route: ActivatedRoute) { }

  ngAfterViewInit() {
    setTimeout(() => {
      this.route.data
        .subscribe((data: { resp: String }) => {
          this.file = data.resp;
       });
    }, 100);
  }

  ngOnInit() {

  }

}
