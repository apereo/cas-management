import { Component, OnInit } from '@angular/core';
import {Messages} from '../../../../messages';
import {Data} from '../../../data';
import {MetadataEntityAttributesAttributeReleasePolicy} from '../../../../../domain/attribute-release';

@Component({
  selector: 'app-metadata',
  templateUrl: './metadata.component.html',
  styleUrls: ['./metadata.component.css']
})
export class MetadataComponent implements OnInit {

  policy: MetadataEntityAttributesAttributeReleasePolicy;
  original: MetadataEntityAttributesAttributeReleasePolicy;

  constructor(public messages: Messages,
              public data: Data) {
    this.policy = data.service.attributeReleasePolicy as MetadataEntityAttributesAttributeReleasePolicy;
    this.original = data.original && data.original.attributeReleasePolicy as MetadataEntityAttributesAttributeReleasePolicy;
  }

  ngOnInit() {
  }

}
