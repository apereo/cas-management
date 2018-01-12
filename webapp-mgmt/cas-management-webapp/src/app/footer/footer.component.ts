import { Component, OnInit } from '@angular/core';
import {FooterService} from './footer.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  casVersion: String;
  mgmtVersion: String;

  constructor(private service: FooterService) { }

  ngOnInit() {
    this.service.getVersions()
        .then(resp => {
            this.casVersion = resp[0];
            this.mgmtVersion = resp[1];
        });
  }

}
