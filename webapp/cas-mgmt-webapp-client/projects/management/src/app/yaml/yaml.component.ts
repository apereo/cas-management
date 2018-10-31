import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-yaml',
  templateUrl: './yaml.component.html',
  styleUrls: ['./yaml.component.css']
})
export class YamlComponent implements OnInit, AfterViewInit {
  file: String;

  constructor(private route: ActivatedRoute) { }

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
