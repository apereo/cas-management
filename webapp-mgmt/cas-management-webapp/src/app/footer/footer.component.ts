import { Component, OnInit } from '@angular/core';
import {FooterService} from './footer.service';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs/index';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  casVersion: String;
  mgmtVersion: String;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private service: FooterService,
              private breakpointObserver: BreakpointObserver,) { }

  ngOnInit() {
    this.service.getVersions()
        .subscribe(resp => {
            this.casVersion = resp[0];
            this.mgmtVersion = resp[1];
        });
  }

}
