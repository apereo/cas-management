import { Component, OnInit } from '@angular/core';
import {Data} from '../../data';
import {FormData } from '../../../../domain/form-data';
import {Messages} from '../../../messages';

@Component({
  selector: 'app-attribute-release-consent',
  templateUrl: './consent.component.html',
  styleUrls: ['./consent.component.css']
})
export class ConsentComponent implements OnInit {
  formData: FormData;

  constructor(public messages: Messages,
              public data: Data) {
    this.formData = data.formData;
  }

  ngOnInit() {
  }


  isEmpty(data: any[]): boolean {
    return !data || data.length === 0;
  }
}
