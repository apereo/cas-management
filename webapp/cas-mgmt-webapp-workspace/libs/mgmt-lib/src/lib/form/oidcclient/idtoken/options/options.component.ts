import {Component, Input, OnInit} from '@angular/core';
import {FormDataService} from '../../../../form-data.service';
import {OptionsForm} from './options.form';

@Component({
  selector: 'lib-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {

  @Input()
  form: OptionsForm;

  constructor(public formData: FormDataService) { }

  ngOnInit() {
  }

}
