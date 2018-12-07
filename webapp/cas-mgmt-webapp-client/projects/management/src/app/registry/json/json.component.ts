import { Component, OnInit, AfterViewInit} from '@angular/core';
import {ChangesService} from '../../version-control/changes/changes.service';
import { Location } from '@angular/common';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-json',
  templateUrl: './json.component.html',
  styleUrls: ['./json.component.css']
})
export class JSONComponent implements AfterViewInit, OnInit {

  file: String;

  constructor(private service: ChangesService,
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
