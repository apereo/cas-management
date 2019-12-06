import {Component, Input, OnInit} from '@angular/core';
import {MgmtFormControl} from '../mgmt-formcontrol';

@Component({
  selector: 'lib-redirect-uri',
  templateUrl: './redirect-uri.component.html'
})
export class RedirectUriComponent implements OnInit {

  @Input()
  control: MgmtFormControl;

  prompt = 'Redirect URL';
  tip = 'A url that represents the OAuth/OIDC server to redirect to.';
  urls: MgmtFormControl[];

  constructor() {
  }

  ngOnInit() {
    const uris = this.control.value as string;
    if (!uris || uris.length === 0) {
      this.urls = [this.createUrl(null)];
    } else {
      this.urls = uris.split('\|').map(u => this.createUrl(u));
    }
  }

  createUrl(val: string) {
    const url = new MgmtFormControl(val, {updateOn: 'blur'});
    url.valueChanges.subscribe(() => {
      this.setControl();
    });
    return url;
  }

  addUrl() {
    this.urls.push(this.createUrl('https://'));
  }

  delete(index: number) {
    this.urls.splice(index, 1);
    this.setControl();
  }

  setControl() {
    this.control.setValue(this.urls.map(u => u.value as string).join('|'), {emitEvent: true});
    this.control.markAsDirty();
    this.control.markAsTouched();
  }


}
