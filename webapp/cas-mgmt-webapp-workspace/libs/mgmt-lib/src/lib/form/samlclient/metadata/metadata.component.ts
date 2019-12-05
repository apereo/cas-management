import {Component, Input, OnInit} from '@angular/core';
import {FormDataService} from '../../../form-data.service';
import {MetadataForm} from './metadata.form';

@Component({
  selector: 'lib-metadata',
  templateUrl: './metadata.component.html'
})
export class SamlMetadataComponent implements OnInit {

  @Input()
  form: MetadataForm;

  constructor(public formData: FormDataService) {
  }

  ngOnInit() {
  }

}
