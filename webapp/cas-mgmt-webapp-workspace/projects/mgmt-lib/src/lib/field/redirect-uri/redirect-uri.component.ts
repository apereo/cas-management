import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';

/**
 * Component to display/update an OAuth Redirect URL.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-redirect-uri',
  templateUrl: './redirect-uri.component.html',
  styleUrls: ['./redirect-uri.component.css']
})
export class RedirectUriComponent implements OnInit {

  @Input()
  control: FormControl;

  prompt = 'Redirect URL';
  tip = 'A url that represents the OAuth/OIDC server to redirect to.';
  urls: FormControl[];

  /**
   * Starts the component by splitting the redirect url string into an array.
   */
  ngOnInit() {
    const uris = this.control.value as string;
    if (!uris || uris.length === 0) {
      this.urls = [this.createUrl(null)];
    } else {
      this.urls = uris.split('\|').map(u => this.createUrl(u));
    }
  }

  /**
   * Creates a new form control to add an additional redirect url.
   *
   * @param val - url
   */
  createUrl(val: string) {
    const url = new FormControl(val, {updateOn: 'blur'});
    url.valueChanges.subscribe(() => {
      this.setControl();
    });
    return url;
  }

  /**
   * Adds and additional redirect url allowed by the service.
   */
  addUrl() {
    this.urls.push(this.createUrl('https://'));
  }

  /**
   * Removes the url at the passed index.
   *
   * @param index - index to remove
   */
  delete(index: number) {
    this.urls.splice(index, 1);
    this.setControl();
  }

  /**
   * Sets the values of the control.
   */
  setControl() {
    this.control.setValue(this.urls.map(u => u.value as string).join('|'), {emitEvent: true});
    this.control.markAsDirty();
    this.control.markAsTouched();
  }

}
