import { Component, OnInit } from '@angular/core';
import {Messages} from '../../../../messages';
import {Data} from '../../../data';
import {ReturnRestfulAttributeReleasePolicy} from '../../../../../domain/attribute-release';

@Component({
  selector: 'app-restful',
  templateUrl: './restful.component.html',
  styleUrls: ['./restful.component.css']
})
export class RestfulComponent implements OnInit {

  policy: ReturnRestfulAttributeReleasePolicy;
  original: ReturnRestfulAttributeReleasePolicy;

  constructor(public messages: Messages,
              public data: Data) {
    this.policy = data.service.attributeReleasePolicy as ReturnRestfulAttributeReleasePolicy;
    this.original = data.original && data.original.attributeReleasePolicy as ReturnRestfulAttributeReleasePolicy;
  }

  ngOnInit() {
  }

}
