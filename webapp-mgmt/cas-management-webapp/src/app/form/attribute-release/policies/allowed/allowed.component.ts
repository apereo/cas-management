import { Component, OnInit } from '@angular/core';
import {Data} from '../../../data';
import {FormData} from '../../../../../domain/form-data';
import {Messages} from '../../../../messages';
import {ReturnAllowedAttributeReleasePolicy} from '../../../../../domain/attribute-release';

@Component({
  selector: 'app-allowed',
  templateUrl: './allowed.component.html',
  styleUrls: ['./allowed.component.css']
})
export class AllowedComponent implements OnInit {

  policy: ReturnAllowedAttributeReleasePolicy;
  original: ReturnAllowedAttributeReleasePolicy;
  formData: FormData;

  constructor(public messages: Messages,
              public data: Data) {
    this.policy = data.service.attributeReleasePolicy as ReturnAllowedAttributeReleasePolicy;
    this.original = data.original && data.original.attributeReleasePolicy as ReturnAllowedAttributeReleasePolicy;
    this.formData = data.formData;
  }

  ngOnInit() {
  }

}
