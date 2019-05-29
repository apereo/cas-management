import { Component, OnInit } from '@angular/core';
import {FooterService} from './footer.service';
import {BreakpointObserver} from '@angular/cdk/layout';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs/index';

@Component({
  selector: 'lib-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  casVersion: string;
  mgmtVersion: string;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(['(max-width: 799px)'])
    .pipe(
      map(result => result.matches)
    );

  constructor(private service: FooterService,
              private breakpointObserver: BreakpointObserver) { }

  ngOnInit() {
    this.service.getVersions()
        .subscribe(resp => {
            this.casVersion = resp[0];
            this.mgmtVersion = resp[1];
        });
  }

}
