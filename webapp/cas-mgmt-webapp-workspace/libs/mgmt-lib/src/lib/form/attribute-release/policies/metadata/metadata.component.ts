import {Component, Input, OnInit} from '@angular/core';
import {MetadataReleaseForm} from './metadata.form';

@Component({
  selector: 'lib-metadata',
  templateUrl: './metadata.component.html'
})
export class MetadataComponent implements OnInit {

  @Input()
  form: MetadataReleaseForm;

  constructor() {
  }

  ngOnInit() {
  }

}
