import { Component, OnInit } from '@angular/core';
import {FooterService} from './footer.service';
import {BreakpointObserver} from '@angular/cdk/layout';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

/**
 * Component used to display an application footer.
 *
 * @author Travis Schmidt
 */
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
              private breakpointObserver: BreakpointObserver) {
  }

  /**
   *  Starts the component by retrieving the currently deployed version of the app.
   */
  ngOnInit() {
    this.service.getVersions()
        .subscribe(resp => {
            this.casVersion = resp[0];
            this.mgmtVersion = resp[1];
        });
  }

}
