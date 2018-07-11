import {Component, OnInit} from '@angular/core';
import {Messages} from '../../messages';
import {Data} from '../data';

@Component({
  selector: 'app-linkrefs',
  templateUrl: './linkrefs.component.html'
})
export class LinkrefsComponent implements OnInit {


  constructor(public messages: Messages,
              public data: Data) {
  }

  ngOnInit() {
  }

  checkForSpaces(url: string) {
    if (url === 'info') {
      this.data.service.informationUrl = this.data.service.informationUrl ? this.data.service.informationUrl.trim() : null;
    } else {
      this.data.service.privacyUrl = this.data.service.privacyUrl ? this.data.service.privacyUrl.trim() : null;
    }
  }

}
