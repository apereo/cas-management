import {Component, Input, OnInit} from '@angular/core';
import {FormDataService} from '../../../form-data.service';
import {RemoteForm} from './remote.form';

@Component({
  selector: 'lib-remote',
  templateUrl: './remote.component.html'
})
export class RemoteComponent implements OnInit {

  @Input()
  form: RemoteForm;

  constructor(public formData: FormDataService) {
  }

  ngOnInit() {
  }

}
