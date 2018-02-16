import { Component, OnInit } from '@angular/core';
import {Messages} from '../../../messages';
import {Data} from '../../data';
import {FormData} from '../../../../domain/form-data';

@Component({
  selector: 'app-required',
  templateUrl: './required.component.html',
  styleUrls: ['./required.component.css']
})
export class RequiredComponent implements OnInit {

  formData: FormData;

  constructor(public messages: Messages,
              public data: Data) {
    this.formData = data.formData;
  }

  ngOnInit() {
  }

}
